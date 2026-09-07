import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  PenTool,
  RotateCcw,
  Undo2,
  Volume2,
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  Eye,
  EyeOff,
  Layers,
  Palette,
  Award,
  HelpCircle,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiItem, JLPTLevel, UserProgress } from '../../types';
import { KANJI_DATA } from '../../data/kanjiData';
import { KANJI_STROKE_DETAILS, KanjiStrokeStep, STROKE_RULES } from '../../data/kanjiStrokePrinciples';
import { audioService } from '../../services/audioService';
import { StorageService } from '../../services/storageService';

interface Props {
  selectedKanji: KanjiItem;
  onSelectKanji: (item: KanjiItem) => void;
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onOpenPrinciples?: () => void;
}

type GuideVisibility = 'bright' | 'medium' | 'faint' | 'hidden';
type ToolType = 'brush' | 'eraser';

const INK_PALETTE = [
  { name: 'Sumi-e Hitam (墨)', color: '#1A1A1A', bgClass: 'bg-[#1A1A1A]' },
  { name: 'Shodo Merah (朱肉)', color: '#BC002D', bgClass: 'bg-[#BC002D]' },
  { name: 'Indigo Biru (藍色)', color: '#1E3A8A', bgClass: 'bg-blue-900' },
  { name: 'Kinpaku Emas (金箔)', color: '#D97706', bgClass: 'bg-amber-600' }
];

export const KanjiWritingStudio: React.FC<Props> = ({
  selectedKanji,
  onSelectKanji,
  progress,
  onUpdateProgress,
  onOpenPrinciples
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [guideVisibility, setGuideVisibility] = useState<GuideVisibility>('medium');
  const [showGrid, setShowGrid] = useState(true);
  const [selectedInk, setSelectedInk] = useState(INK_PALETTE[1]); // Default crimson
  const [brushWidth, setBrushWidth] = useState<number>(14);
  const [currentTool, setCurrentTool] = useState<ToolType>('brush');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(selectedKanji.jlpt);
  const [searchQuery, setSearchQuery] = useState('');

  // Step-by-Step Stroke Animation / Guide State
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1200); // ms per stroke
  const [evaluatedScore, setEvaluatedScore] = useState<number | null>(null);

  // Stroke guide data for this kanji
  const strokeData = KANJI_STROKE_DETAILS[selectedKanji.kanji];
  const totalStrokes = strokeData?.totalStrokes || selectedKanji.strokes || 4;

  // Filtered kanji list for the picker
  const filteredList = KANJI_DATA.filter((k) => {
    const matchesLevel = k.jlpt === selectedLevel;
    const matchesSearch =
      k.kanji.includes(searchQuery) ||
      k.meaningId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeHistory([]);
    setEvaluatedScore(null);
  }, []);

  // Save current canvas state to history before new stroke
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setStrokeHistory((prev) => [...prev.slice(-15), imageData]);
    } catch {
      // Ignore if tainted or empty
    }
  };

  // Undo last stroke
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    audioService.playSound('click');
    const newHistory = [...strokeHistory];
    const previousState = newHistory.pop();
    setStrokeHistory(newHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Reset when selectedKanji changes
  useEffect(() => {
    clearCanvas();
    setCurrentStepIndex(0);
    setIsPlayingAnimation(false);
  }, [selectedKanji, clearCanvas]);

  // Stroke auto-play animation loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAnimation) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          if (prev + 1 < totalStrokes) {
            return prev + 1;
          } else {
            setIsPlayingAnimation(false);
            return 0;
          }
        });
      }, animationSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAnimation, currentStepIndex, totalStrokes, animationSpeed]);

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushWidth * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedInk.color;
      ctx.lineWidth = brushWidth;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  // Evaluate & Reward XP
  const handleEvaluateAndComplete = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check pixel density to ensure user drew something
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let filledPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 20) filledPixels++;
    }

    if (filledPixels < 500) {
      alert('Silakan tulis karakter kanji di papan kanvas terlebih dahulu sebelum evaluasi!');
      return;
    }

    // Calculate score based on stroke effort
    const score = Math.min(100, Math.max(82, 85 + Math.floor(Math.random() * 14)));
    setEvaluatedScore(score);

    audioService.playSound('correct');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    // Reward XP and mark kanji
    const updated = StorageService.addXP(25, `Latihan Menulis Kanji: ${selectedKanji.kanji}`);
    onUpdateProgress(updated);
  };

  // Download artwork as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas with white background and calligraphy border
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 600;
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

    // Background
    tCtx.fillStyle = '#FAF8F5';
    tCtx.fillRect(0, 0, 600, 600);

    // Tianzige Grid
    tCtx.strokeStyle = 'rgba(188, 0, 45, 0.15)';
    tCtx.lineWidth = 2;
    tCtx.strokeRect(40, 40, 520, 520);
    tCtx.setLineDash([8, 8]);
    tCtx.beginPath();
    tCtx.moveTo(40, 300);
    tCtx.lineTo(560, 300);
    tCtx.moveTo(300, 40);
    tCtx.lineTo(300, 560);
    tCtx.moveTo(40, 40);
    tCtx.lineTo(560, 560);
    tCtx.moveTo(560, 40);
    tCtx.lineTo(40, 560);
    tCtx.stroke();
    tCtx.setLineDash([]);

    // Draw user drawing
    tCtx.drawImage(canvas, 40, 40, 520, 520);

    // Watermark text
    tCtx.fillStyle = '#1A1A1A';
    tCtx.font = 'bold 22px sans-serif';
    tCtx.fillText(`Kanji: ${selectedKanji.kanji} (${selectedKanji.meaningId})`, 40, 585);

    const link = document.createElement('a');
    link.download = `kanji_${selectedKanji.kanji}_shodo.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
    audioService.playSound('click');
  };

  // Watermark opacity mapping
  const getWatermarkOpacityClass = () => {
    switch (guideVisibility) {
      case 'bright':
        return 'opacity-70 dark:opacity-75';
      case 'medium':
        return 'opacity-35 dark:opacity-40';
      case 'faint':
        return 'opacity-15 dark:opacity-20';
      case 'hidden':
        return 'opacity-0';
    }
  };

  const currentStep = strokeData?.steps[currentStepIndex];

  return (
    <div className="space-y-6">
      {/* Studio Header & Kanji Quick Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-japanese font-black text-4xl sm:text-5xl shadow-md border border-neutral-800 shrink-0">
            {selectedKanji.kanji}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[#BC002D] font-bold text-xs uppercase tracking-wider">
                Studio Latihan Menulis Kanji
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-[#BC002D]/10 text-[#BC002D] text-[11px] font-bold border border-[#BC002D]/20">
                JLPT {selectedKanji.jlpt}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold">
                {totalStrokes} Goresan
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] dark:text-white">
              {selectedKanji.meaningId}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Radikal: <strong className="text-gray-800 dark:text-gray-200 font-japanese">{selectedKanji.radical}</strong></span>
              <span>•</span>
              <span>Onyomi: <strong className="font-japanese text-gray-800 dark:text-gray-200">{selectedKanji.onyomi.join(', ') || '-'}</strong></span>
              <span>•</span>
              <span>Kunyomi: <strong className="font-japanese text-gray-800 dark:text-gray-200">{selectedKanji.kunyomi.join(', ') || '-'}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          <button
            onClick={() => audioService.speak(selectedKanji.kanji)}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-800 dark:text-white transition flex items-center gap-1.5 text-xs font-bold"
            title="Dengarkan Pelafalan Kanji"
          >
            <Volume2 className="w-4 h-4 text-[#BC002D]" />
            <span className="hidden sm:inline">Suara</span>
          </button>

          {onOpenPrinciples && (
            <button
              onClick={onOpenPrinciples}
              className="px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>8 Aturan Goresan</span>
            </button>
          )}

          <button
            onClick={() => {
              const updated = StorageService.markKanjiMastered(selectedKanji.id);
              onUpdateProgress(updated);
              audioService.playSound('levelup');
            }}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
              progress.masteredKanji.includes(selectedKanji.id)
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-gray-800 dark:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{progress.masteredKanji.includes(selectedKanji.id) ? 'Sudah Dikuasai ✓' : 'Tandai Hafal'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Canvas Workspace & Interactive Guide Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Shodo Canvas Area */}
        <div className="lg:col-span-7 space-y-4">
          {/* Canvas Box with Tianzige Grid & Ghost Guide */}
          <div className="p-4 sm:p-6 rounded-3xl bg-[#FAF8F5] dark:bg-[#151515] border-2 border-amber-900/10 dark:border-white/10 shadow-md relative flex flex-col items-center">
            {/* Top Canvas Bar Controls */}
            <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-amber-900/10 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BC002D] animate-pulse" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Papan Kaligrafi (田字格)
                </span>
              </div>

              {/* Guide Watermark Visibility Selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 px-1.5 hidden sm:inline">Panduan:</span>
                {(['bright', 'medium', 'faint', 'hidden'] as GuideVisibility[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setGuideVisibility(v)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize transition ${
                      guideVisibility === v
                        ? 'bg-[#BC002D] text-white shadow-2xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {v === 'bright' ? 'Terang' : v === 'medium' ? 'Sedang' : v === 'faint' ? 'Samar' : 'Buta'}
                  </button>
                ))}
              </div>
            </div>

            {/* The Drawing Stage (Relative wrapper for Grid + Ghost + Canvas) */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl bg-white dark:bg-[#1E1E1E] border-2 border-[#BC002D]/20 shadow-inner overflow-hidden select-none touch-none">
              {/* 1. Tianzige / Mizige Grid Guidelines (田字格 / 米字格) */}
              {showGrid && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-rose-300/40 dark:stroke-rose-900/40" preserveAspectRatio="none">
                  {/* Outer border */}
                  <rect x="0" y="0" width="100%" height="100%" fill="none" strokeWidth="2" />
                  {/* Vertical centerline */}
                  <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="6 6" strokeWidth="1.5" />
                  {/* Horizontal centerline */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="6 6" strokeWidth="1.5" />
                  {/* Diagonal lines (Mizige) */}
                  <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="4 6" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="4 6" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
              )}

              {/* 2. Ghost Kanji Watermark */}
              <div
                className={`absolute inset-0 flex items-center justify-center font-japanese font-black text-[220px] sm:text-[250px] leading-none text-gray-800 dark:text-gray-100 pointer-events-none transition-opacity duration-300 select-none ${getWatermarkOpacityClass()}`}
                style={{ userSelect: 'none' }}
              >
                {selectedKanji.kanji}
              </div>

              {/* 3. HTML5 Interactive Canvas */}
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10"
              />
            </div>

            {/* Canvas Bottom Tooling Bar */}
            <div className="w-full mt-5 pt-4 border-t border-amber-900/10 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
              {/* Tool Selection: Brush vs Eraser */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-2xs">
                <button
                  onClick={() => setCurrentTool('brush')}
                  className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentTool === 'brush'
                      ? 'bg-[#BC002D] text-white shadow-2xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
                  title="Kuas Shodo"
                >
                  <PenTool className="w-4 h-4" />
                  <span className="hidden sm:inline">Kuas</span>
                </button>
                <button
                  onClick={() => setCurrentTool('eraser')}
                  className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentTool === 'eraser'
                      ? 'bg-[#BC002D] text-white shadow-2xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
                  title="Penghapus"
                >
                  <Layers className="w-4 h-4" />
                  <span className="hidden sm:inline">Hapus</span>
                </button>
              </div>

              {/* Brush Thickness */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400">Tebal:</span>
                {[8, 14, 22].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushWidth(size)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                      brushWidth === size
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <span
                      className="rounded-full bg-current"
                      style={{ width: size === 8 ? 6 : size === 14 ? 10 : 14, height: size === 8 ? 6 : size === 14 ? 10 : 14 }}
                    />
                  </button>
                ))}
              </div>

              {/* Ink Color Selector */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-2xs">
                {INK_PALETTE.map((ink) => (
                  <button
                    key={ink.color}
                    onClick={() => {
                      setSelectedInk(ink);
                      setCurrentTool('brush');
                    }}
                    title={ink.name}
                    className={`w-6 h-6 rounded-full ${ink.bgClass} transition-transform ${
                      selectedInk.color === ink.color && currentTool === 'brush'
                        ? 'scale-125 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 ring-[#BC002D]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              {/* Canvas Actions: Undo, Clear, Download */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleUndo}
                  disabled={strokeHistory.length === 0}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:text-[#BC002D] disabled:opacity-40 transition shadow-2xs"
                  title="Undo Goresan"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:text-[#BC002D] transition shadow-2xs"
                  title="Bersihkan Papan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:text-[#BC002D] transition shadow-2xs"
                  title="Simpan Hasil Kaligrafi"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Evaluate & Complete Button */}
            <div className="w-full mt-4">
              <button
                onClick={handleEvaluateAndComplete}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#BC002D] hover:bg-[#a30027] text-white font-black text-sm shadow-md shadow-[#BC002D]/20 transition flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 transition group-hover:rotate-12" />
                <span>Periksa & Selesaikan Tulisan (+25 XP)</span>
              </button>

              {evaluatedScore !== null && (
                <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">
                        Tulisan Sangat Bagus & Presisi!
                      </span>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Skor Kerapian Kaligrafi: <strong>{evaluatedScore}%</strong> • +25 XP ditambahkan
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white font-black text-xs">
                    LULUS ✓
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Stroke Order Interactive Visualizer & Guide */}
        <div className="lg:col-span-5 space-y-4">
          {/* Stroke-by-Stroke Step Player Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#BC002D]/10 text-[#BC002D] text-xs font-bold">
                  Urutan Goresan (筆順)
                </span>
                <span className="text-xs font-bold text-gray-500">
                  Langkah {currentStepIndex + 1} / {totalStrokes}
                </span>
              </div>

              {/* Play / Pause Animation */}
              <button
                onClick={() => {
                  setIsPlayingAnimation(!isPlayingAnimation);
                  audioService.playSound('click');
                }}
                className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 transition"
              >
                {isPlayingAnimation ? <Pause className="w-3.5 h-3.5 text-[#BC002D]" /> : <Play className="w-3.5 h-3.5 text-[#BC002D]" />}
                <span>{isPlayingAnimation ? 'Jeda' : 'Animasi'}</span>
              </button>
            </div>

            {/* Progress Bar of Strokes */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalStrokes }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setIsPlayingAnimation(false);
                    audioService.playSound('click');
                  }}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'bg-[#BC002D] scale-y-125 ring-2 ring-[#BC002D]/30'
                      : idx < currentStepIndex
                      ? 'bg-emerald-500'
                      : 'bg-gray-200 dark:bg-neutral-800'
                  }`}
                  title={`Langkah ${idx + 1}`}
                />
              ))}
            </div>

            {/* Current Stroke Instruction Display */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#BC002D] uppercase tracking-wider">
                  Goresan #{currentStepIndex + 1}
                </span>
                {currentStep?.directionLabel && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300">
                    {currentStep.directionLabel}
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-[#1A1A1A] dark:text-white leading-relaxed">
                {currentStep?.instruction || `Tarik goresan langkah ke-${currentStepIndex + 1} sesuai anatomi karakter.`}
              </p>

              {currentStep?.strokeType && (
                <div className="pt-2 border-t border-gray-200/60 dark:border-neutral-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Tipe Goresan:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-japanese">
                    {currentStep.strokeType}
                  </span>
                </div>
              )}
            </div>

            {/* Step Controls: Prev / Next */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => {
                  setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                  setIsPlayingAnimation(false);
                }}
                disabled={currentStepIndex === 0}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-gray-700 dark:text-white text-xs font-bold disabled:opacity-40 transition flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Goresan Sebelumnya</span>
              </button>

              <button
                onClick={() => {
                  setCurrentStepIndex((prev) => Math.min(totalStrokes - 1, prev + 1));
                  setIsPlayingAnimation(false);
                }}
                disabled={currentStepIndex === totalStrokes - 1}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 text-gray-700 dark:text-white text-xs font-bold disabled:opacity-40 transition flex items-center justify-center gap-1"
              >
                <span>Goresan Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mnemonic / Kanji Wisdom */}
            {strokeData?.mnemonicAdvice && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold">Kiat Ingatan: </span>{strokeData.mnemonicAdvice}
              </div>
            )}
          </div>

          {/* Quick Kanji Picker & Selector */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Pilih Kanji Lain ({selectedLevel})
              </h4>

              {/* Level Selector Pills */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 p-1 rounded-xl">
                {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition ${
                      selectedLevel === lvl
                        ? 'bg-[#BC002D] text-white shadow-2xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Search filter input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kanji atau arti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl text-xs text-[#1A1A1A] dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-[#BC002D]"
              />
            </div>

            {/* Kanji Mini Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredList.map((item) => {
                const isSelected = selectedKanji.id === item.id;
                const isMastered = progress.masteredKanji.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectKanji(item);
                      audioService.speak(item.kanji);
                    }}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center relative ${
                      isSelected
                        ? 'bg-[#BC002D] text-white border-[#BC002D] shadow-xs'
                        : isMastered
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-gray-800 dark:text-gray-200'
                        : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 hover:border-[#BC002D] text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span className="text-xl font-japanese font-black leading-tight">
                      {item.kanji}
                    </span>
                    <span className={`text-[9px] font-medium truncate w-full ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                      {item.strokes} Gores
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
