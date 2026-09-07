import React from 'react';
import { ModuleMetric } from '../../types';

interface Props {
  metrics: ModuleMetric[];
  size?: number;
}

export const RadarChart8D: React.FC<Props> = ({ metrics, size = 320 }) => {
  const center = size / 2;
  const radius = (size / 2) - 42;
  const totalAxes = metrics.length || 8;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Calculate polygon points for each grid level
  const getGridPolygon = (levelFactor: number) => {
    return Array.from({ length: totalAxes }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * levelFactor * Math.cos(angle);
      const y = center + radius * levelFactor * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate polygon points for user's actual metric values
  const userPolygonPoints = metrics.map((metric, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const valueFactor = Math.max(0.15, Math.min(1.0, metric.progressPercent / 100));
    const x = center + radius * valueFactor * Math.cos(angle);
    const y = center + radius * valueFactor * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Background Grid Concentric Polygons */}
        {levels.map((lvl, idx) => (
          <polygon
            key={idx}
            points={getGridPolygon(lvl)}
            fill={idx === levels.length - 1 ? 'rgba(188, 0, 45, 0.02)' : 'none'}
            stroke="currentColor"
            className="text-gray-200 dark:text-neutral-800"
            strokeWidth={idx === levels.length - 1 ? '1.5' : '1'}
            strokeDasharray={idx === levels.length - 1 ? 'none' : '2,2'}
          />
        ))}

        {/* Axis Spokes */}
        {metrics.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-gray-200 dark:text-neutral-800"
              strokeWidth="1"
            />
          );
        })}

        {/* User Metric Polygon Area */}
        <polygon
          points={userPolygonPoints}
          fill="rgba(188, 0, 45, 0.25)"
          stroke="#BC002D"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Point Dots & Labels */}
        {metrics.map((metric, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const valueFactor = Math.max(0.15, Math.min(1.0, metric.progressPercent / 100));
          const pointX = center + radius * valueFactor * Math.cos(angle);
          const pointY = center + radius * valueFactor * Math.sin(angle);

          // Label Position slightly outside radius
          const labelRadius = radius + 24;
          const labelX = center + labelRadius * Math.cos(angle);
          const labelY = center + labelRadius * Math.sin(angle);

          return (
            <g key={metric.id}>
              {/* Vertex Circle */}
              <circle
                cx={pointX}
                cy={pointY}
                r="4.5"
                fill="#BC002D"
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-xs transition-all duration-700"
              />

              {/* Text Label */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-bold fill-gray-700 dark:fill-gray-300 select-none"
              >
                {metric.name}
              </text>
              <text
                x={labelX}
                y={labelY + 11}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-bold fill-[#BC002D] select-none"
              >
                {metric.progressPercent}%
              </text>
            </g>
          );
        })}

        {/* Center Point */}
        <circle cx={center} cy={center} r="3" fill="#BC002D" />
      </svg>

      <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#BC002D]"></span>
          <span>Profil Penguasaan 8 Pilar Bahasa</span>
        </div>
      </div>
    </div>
  );
};
