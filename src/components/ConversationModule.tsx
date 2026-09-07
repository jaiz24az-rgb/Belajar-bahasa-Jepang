import React, { useState } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, Sparkles, Send, CheckCircle, Info, ChevronRight, User, Bot, ArrowRight, Play, Film } from 'lucide-react';
import { ConversationScenario, DialogueLine, UserProgress } from '../types';
import { CONVERSATIONS_DATA } from '../data/conversationsData';
import { audioService } from '../services/audioService';
import { speechRecognitionService } from '../services/speechRecognitionService';
import { getAIConversationResponse } from '../services/geminiService';
import { StorageService } from '../services/storageService';
import { VideoShortsView } from './conversation/VideoShortsView';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ConversationModule: React.FC<Props> = ({ progress, onUpdateProgress }) => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(CONVERSATIONS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'video_shorts' | 'scenario' | 'ai_chat'>('video_shorts');
  const [showFurigana, setShowFurigana] = useState(true);

  // Roleplay speaking test on line
  const [recordingLineId, setRecordingLineId] = useState<string | null>(null);
  const [lineFeedback, setLineFeedback] = useState<{ [lineId: string]: { transcript: string; score: number } }>({});

  // AI Chat Mode State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; romaji?: string; translation?: string; grammarNote?: string }>>([
    {
      role: 'assistant',
      text: 'こんにちは！私は日本語会話パートナーのサクラです。今日はどんなことについて話しましょうか？',
      romaji: 'Konnichiwa! Watashi wa Nihongo kaiwa paatonaa no Sakura desu. Kyou wa donna koto ni tsuite hanashimashou ka?',
      translation: 'Halo! Saya Sakura, partner latihan percakapan bahasa Jepangmu. Hari ini kita mau ngobrol tentang apa?',
      grammarNote: 'Bentuk sopan ~mashou ka digunakan untuk menawarkan ajakan bersama.',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState<Array<{ japanese: string; romaji: string; meaning: string }>>([
    { japanese: '日本のアニメについて話したいです。', romaji: 'Nihon no anime ni tsuite hanashitai desu.', meaning: 'Saya ingin bicara tentang anime Jepang.' },
    { japanese: '週末の旅行の計画を相談したいです。', romaji: 'Shuumatsu no ryokou no keikaku o soudan shitai desu.', meaning: 'Saya ingin konsultasi rencana liburan akhir pekan.' },
  ]);

  // Voice recording for AI Chat
  const [isListeningChat, setIsListeningChat] = useState(false);

  // Handle line recording
  const startLineRecording = (line: DialogueLine) => {
    if (recordingLineId === line.id) {
      speechRecognitionService.stopListening();
      setRecordingLineId(null);
      return;
    }

    setRecordingLineId(line.id);
    audioService.playSound('click');

    speechRecognitionService.startListening(
      (result) => {
        if (result.isFinal) {
          const score = speechRecognitionService.calculateOfflineSimilarity(line.japanese, result.transcript);
          setLineFeedback((prev) => ({
            ...prev,
            [line.id]: { transcript: result.transcript, score },
          }));
          setRecordingLineId(null);
          if (score >= 70) {
            audioService.playSound('correct');
            const updated = StorageService.addXP(15, 'Dialogue Speaking Practice');
            onUpdateProgress(updated);
          } else {
            audioService.playSound('wrong');
          }
        }
      },
      (err) => {
        console.warn('Recognition error:', err);
        setRecordingLineId(null);
      },
      () => {
        setRecordingLineId(null);
      }
    );
  };

  // Handle Send AI message
  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMsg).trim();
    if (!message || isAiLoading) return;

    const newHistory = [...chatMessages, { role: 'user' as const, text: message }];
    setChatMessages(newHistory);
    setInputMsg('');
    setIsAiLoading(true);

    try {
      const response = await getAIConversationResponse(
        selectedScenario.title,
        chatMessages.map((m) => ({ role: m.role, text: m.text })),
        message,
        progress.currentJLPTTarget
      );

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.japaneseResponse,
          romaji: response.romaji,
          translation: response.indonesianTranslation,
          grammarNote: response.grammarNote,
        },
      ]);

      if (response.suggestedReplies && response.suggestedReplies.length > 0) {
        setSuggestedReplies(response.suggestedReplies);
      }

      audioService.speak(response.japaneseResponse);
      const updated = StorageService.addXP(20, 'AI Conversation');
      onUpdateProgress(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleVoiceInputForChat = () => {
    if (isListeningChat) {
      speechRecognitionService.stopListening();
      setIsListeningChat(false);
      return;
    }

    setIsListeningChat(true);
    speechRecognitionService.startListening(
      (res) => {
        setInputMsg(res.transcript);
        if (res.isFinal) {
          setIsListeningChat(false);
        }
      },
      () => setIsListeningChat(false),
      () => setIsListeningChat(false)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#BC002D] font-bold text-xs uppercase tracking-widest">
              Roleplay & AI Partner
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-500 font-japanese">会話モジュール</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#BC002D] text-white font-japanese text-sm flex items-center justify-center font-bold">会話</span>
            <span>Modul Percakapan Praktis & Roleplay AI</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Simulasi dialog situasional autentik untuk pemula & partner mengobrol cerdas Gemini AI
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-2xs self-start sm:self-center overflow-x-auto max-w-full">
          <button
            onClick={() => {
              setActiveTab('video_shorts');
              audioService.playSound('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'video_shorts'
                ? 'bg-[#BC002D] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Video Shorts (Reels)</span>
            <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.2 rounded-full">BARU</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('scenario');
              audioService.playSound('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'scenario'
                ? 'bg-[#BC002D] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Skenario Praktis</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('ai_chat');
              audioService.playSound('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai_chat'
                ? 'bg-[#BC002D] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chat Bebas AI</span>
          </button>
        </div>
      </div>

      {activeTab === 'video_shorts' && (
        <VideoShortsView progress={progress} onUpdateProgress={onUpdateProgress} />
      )}

      {activeTab === 'scenario' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Scenario Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Pilih Topik Dialog:</h3>
            <div className="space-y-2.5">
              {CONVERSATIONS_DATA.map((sc) => {
                const isSelected = selectedScenario.id === sc.id;
                return (
                  <div
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc);
                      setLineFeedback({});
                      audioService.playSound('click');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-md shadow-[#BC002D]/20'
                        : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 hover:border-[#BC002D] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                      }`}>
                        JLPT {sc.level}
                      </span>
                      <span className={`text-xs font-japanese ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {sc.titleJa}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm mt-1.5 leading-snug">{sc.title}</h4>
                    <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                      {sc.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dialogue Roleplay View */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-6">
            {/* Header of Scenario */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
              <div>
                <span className="text-xs font-bold text-[#BC002D] dark:text-rose-400 font-japanese">
                  {selectedScenario.titleJa}
                </span>
                <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                  {selectedScenario.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFurigana(!showFurigana)}
                  className="px-3.5 py-1.5 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition"
                >
                  {showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
                </button>
              </div>
            </div>

            {/* Cultural Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 dark:text-amber-200">
                <p className="font-bold">Tips Budaya & Etika Jepang (Bunka Tip):</p>
                <p className="mt-0.5">{selectedScenario.cultureTip}</p>
              </div>
            </div>

            {/* Dialogue Bubble List */}
            <div className="space-y-4">
              {selectedScenario.dialogue.map((line) => {
                const isLearner = line.speakerRole === 'learner';
                const feedback = lineFeedback[line.id];
                const isRecordingThis = recordingLineId === line.id;

                return (
                  <div
                    key={line.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isLearner
                        ? 'bg-rose-50/50 dark:bg-[#BC002D]/10 border-[#BC002D]/30 ml-4 sm:ml-8'
                        : 'bg-gray-50 dark:bg-neutral-900/60 border-gray-100 dark:border-neutral-800 mr-4 sm:mr-8'
                    }`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isLearner ? 'bg-[#BC002D] text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          {isLearner ? '👤' : '🎌'}
                        </div>
                        <span className="font-bold text-xs text-[#1A1A1A] dark:text-white">
                          {line.speaker}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => audioService.speak(line.japanese)}
                          className="p-1.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:text-[#BC002D] transition shadow-2xs"
                          title="Dengar Audio Native"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => startLineRecording(line)}
                          className={`p-1.5 rounded-xl border transition shadow-2xs ${
                            isRecordingThis
                              ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                              : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:text-rose-500'
                          }`}
                          title="Latih Ucapkan Kalimat Ini"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Japanese Text */}
                    <p className="text-base sm:text-lg font-japanese font-bold text-[#1A1A1A] dark:text-white leading-relaxed">
                      {showFurigana ? line.furigana : line.japanese}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {line.romaji}
                    </p>

                    {/* Translation */}
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 pt-1.5 border-t border-gray-200/60 dark:border-neutral-800">
                      🇮🇩 {line.meaningId}
                    </p>

                    {/* Grammar Tip */}
                    {line.tip && (
                      <p className="text-[11px] text-[#BC002D] dark:text-rose-400 font-semibold">
                        💡 {line.tip}
                      </p>
                    )}

                    {/* Voice Recognition Feedback Box */}
                    {feedback && (
                      <div className={`p-2.5 rounded-2xl text-xs flex items-center justify-between ${
                        feedback.score >= 70
                          ? 'bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
                          : 'bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200'
                      }`}>
                        <div>
                          <p className="font-bold">Hasil Pengenalan Suara: "{feedback.transcript}"</p>
                          <p className="text-[11px]">Akurasi Pelafalan: {feedback.score}%</p>
                        </div>
                        <span className="font-bold text-sm">{feedback.score >= 70 ? '🎯 Bagus!' : '🔄 Coba Lagi'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai_chat' && (
        /* ===================== AI CONVERSATION CHAT VIEW ===================== */
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-4">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BC002D] text-white flex items-center justify-center font-bold text-lg shadow-2xs">
                🌸
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white">Sakura AI (会話パートナー)</h4>
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Siap Mengobrol & Mengoreksi Tata Bahasa
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setChatMessages([chatMessages[0]]);
                audioService.playSound('click');
              }}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Reset Obrolan
            </button>
          </div>

          {/* Messages list */}
          <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
            {chatMessages.map((msg, i) => {
              const isMe = msg.role === 'user';
              return (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    isMe ? 'bg-[#BC002D] text-white' : 'bg-[#1A1A1A] text-white border border-neutral-700'
                  }`}>
                    {isMe ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-3xl max-w-[80%] space-y-1.5 ${
                    isMe
                      ? 'bg-[#BC002D] text-white rounded-tr-none shadow-2xs'
                      : 'bg-gray-50 dark:bg-neutral-900 text-[#1A1A1A] dark:text-white rounded-tl-none border border-gray-100 dark:border-neutral-800'
                  }`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-japanese font-bold text-base leading-relaxed">{msg.text}</p>
                      {!isMe && (
                        <button
                          onClick={() => audioService.speak(msg.text)}
                          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-400 hover:text-[#BC002D]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {msg.romaji && (
                      <p className="text-xs text-gray-400 italic">
                        {msg.romaji}
                      </p>
                    )}

                    {msg.translation && (
                      <p className="text-xs text-gray-700 dark:text-gray-300 pt-1 border-t border-gray-200/60 dark:border-neutral-800">
                        🇮🇩 {msg.translation}
                      </p>
                    )}

                    {msg.grammarNote && (
                      <p className="text-[11px] text-[#BC002D] dark:text-rose-400 font-semibold bg-rose-50 dark:bg-[#BC002D]/10 p-2 rounded-xl mt-1">
                        💡 Catatan Pola Kalimat: {msg.grammarNote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {isAiLoading && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#BC002D] p-2">
                <span className="w-2 h-2 rounded-full bg-[#BC002D] animate-ping" /> Sakura sedang mengetik balasan...
              </div>
            )}
          </div>

          {/* Suggested Quick Replies */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Saran Balasan Cepat:</span>
            <div className="flex flex-wrap gap-2">
              {suggestedReplies.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.japanese)}
                  className="px-3.5 py-1.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs text-gray-800 dark:text-gray-200 hover:border-[#BC002D] font-japanese transition"
                >
                  {sug.japanese} <span className="text-[10px] text-gray-500">({sug.meaning})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input field & Mic */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleVoiceInputForChat}
              className={`p-3 rounded-2xl border transition ${
                isListeningChat
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-gray-100 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200'
              }`}
              title="Bicara Bahasa Jepang via Mikrofon"
            >
              {isListeningChat ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              placeholder="Tulis pesan bahasa Jepang atau Romaji..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl text-sm text-[#1A1A1A] dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#BC002D] font-japanese"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isAiLoading || !inputMsg.trim()}
              className="p-3 bg-[#BC002D] hover:bg-[#a30027] disabled:opacity-50 text-white rounded-2xl shadow-md shadow-[#BC002D]/20 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
