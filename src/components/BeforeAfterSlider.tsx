import { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  projectTitle: string;
  initialPosition?: number;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  projectTitle,
  initialPosition = 52,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(95, Math.max(5, Math.round(rawPct)));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((prev) => Math.min(95, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(5);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(95);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-testid="before-after-slider"
        className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden select-none touch-none cursor-ew-resize estate-card bg-[#ECEEEC]"
      >
        {/* After Layer (Full Base) */}
        <ResilientImage
          src={afterImage}
          alt={afterAlt}
          fallbackTitle={`${projectTitle} — After`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Layer (Clipped to Position) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ResilientImage
            src={beforeImage}
            alt={beforeAlt}
            fallbackTitle={`${projectTitle} — Before`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Measured Bottom Contrast Labels */}
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <span className="inline-block px-3 py-1.5 rounded-[8px] bg-[#0F172A]/80 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
            Before Renovation
          </span>
        </div>
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <span className="inline-block px-3 py-1.5 rounded-[8px] bg-[#14532D]/90 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
            After Estate Verve
          </span>
        </div>

        {/* Emerald Dividing Rule + High-Contrast Central Drag Pill */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#14532D] pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Before and after comparison for ${projectTitle}`}
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={position}
            aria-valuetext={`${position}% before view revealed`}
            onKeyDown={handleKeyDown}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#14532D] text-[#14532D] shadow-[0_6px_20px_rgba(20,83,45,0.28)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
          >
            <ChevronsLeftRight className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Accessible Fine-Tuning Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#404941]">
        <span>Drag handle or use arrow keys to inspect restoration detail</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPosition(15)}
            className="px-2.5 py-1 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] font-semibold hover:border-[#14532D] hover:text-[#14532D] transition-colors whitespace-nowrap"
          >
            Focus After
          </button>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className="px-2.5 py-1 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] font-semibold hover:border-[#14532D] hover:text-[#14532D] transition-colors whitespace-nowrap"
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => setPosition(85)}
            className="px-2.5 py-1 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] font-semibold hover:border-[#14532D] hover:text-[#14532D] transition-colors whitespace-nowrap"
          >
            Focus Before
          </button>
          <span
            data-testid="slider-position-readout"
            className="tabular-nums font-semibold text-[#14532D] min-w-[3.25rem] text-right"
          >
            {position}% split
          </span>
        </div>
      </div>
    </div>
  );
}
