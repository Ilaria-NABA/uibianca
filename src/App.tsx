import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Maximize2,
  RotateCcw,
  Grid,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Eye,
  Check,
} from 'lucide-react';
import { IPhone11Frame } from './components/IPhone11Frame.tsx';

type Page = 1 | 2;
type ButtonStyle = 'classic' | 'brutalist' | 'sketch';
type GridStyle = 'blueprint' | 'dots' | 'none';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [gridStyle, setGridStyle] = useState<GridStyle>('blueprint');
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>('classic');
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [showGuides, setShowGuides] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0.88);
  const [autoScale, setAutoScale] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);

  // Auto-scale calculation based on viewport height so iPhone 11 (920px tall) fits without scrolling
  useEffect(() => {
    const handleResize = () => {
      if (!autoScale) return;
      const availableHeight = window.innerHeight - 110; // header space
      const phoneHeight = 940;
      const calculatedScale = Math.min(
        1,
        Math.max(0.48, Math.round((availableHeight / phoneHeight) * 100) / 100)
      );
      setScale(calculatedScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoScale]);

  const handleNext = () => {
    setDirection('forward');
    setCurrentPage(2);
    setClickCount((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection('backward');
    setCurrentPage(1);
    setClickCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setDirection('backward');
    setCurrentPage(1);
  };

  // Button styles configuration in pure B&W wireframe aesthetic
  const getButtonClasses = () => {
    const base =
      'transition-all duration-150 font-medium tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 select-none';

    switch (buttonStyle) {
      case 'brutalist':
        return `${base} px-9 py-4 bg-white text-black text-lg font-bold border-[2.5px] border-black wireframe-shadow active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-zinc-50`;
      case 'sketch':
        return `${base} px-10 py-3.5 bg-white text-black text-2xl font-wireframe-sketch border-2 border-black rounded-lg shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 hover:bg-zinc-50`;
      case 'classic':
      default:
        return `${base} px-8 py-3.5 bg-white text-black text-base font-semibold border-2 border-black rounded-md wireframe-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-zinc-50`;
    }
  };

  const variants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#ededed] text-black flex flex-col items-center justify-between font-sans overflow-x-hidden">
      {/* Top Prototype Toolbar / Control Bar */}
      <header className="w-full bg-white border-b-2 border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-[0_2px_0_0_#000000] z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-2 border-black px-2.5 py-1 bg-black text-white rounded-xs">
            <Smartphone className="w-4 h-4" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase">
              iPhone 11 Wireframe
            </span>
          </div>

          {/* Current Page Pill in Wireframe Style */}
          <div className="flex items-center border-2 border-black bg-white rounded-xs overflow-hidden text-xs font-mono">
            <button
              onClick={() => {
                if (currentPage !== 1) {
                  setDirection('backward');
                  setCurrentPage(1);
                }
              }}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                currentPage === 1
                  ? 'bg-black text-white font-bold'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              Pagina 1
            </button>
            <div className="w-[1.5px] h-full bg-black self-stretch" />
            <button
              onClick={() => {
                if (currentPage !== 2) {
                  setDirection('forward');
                  setCurrentPage(2);
                }
              }}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                currentPage === 2
                  ? 'bg-black text-white font-bold'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              Pagina 2
            </button>
          </div>
        </div>

        {/* Wireframe Prototype Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Grid Toggle */}
          <div className="flex items-center border-2 border-black bg-white rounded-xs p-0.5">
            <button
              onClick={() => setGridStyle('blueprint')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                gridStyle === 'blueprint'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
              title="Griglia Blueprint"
            >
              Blueprint
            </button>
            <button
              onClick={() => setGridStyle('dots')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                gridStyle === 'dots'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
              title="Griglia a punti"
            >
              Punti
            </button>
            <button
              onClick={() => setGridStyle('none')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                gridStyle === 'none'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
              title="Senza griglia (Bianco puro)"
            >
              Vuota
            </button>
          </div>

          {/* Button Style selector */}
          <div className="flex items-center border-2 border-black bg-white rounded-xs p-0.5">
            <button
              onClick={() => setButtonStyle('classic')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                buttonStyle === 'classic'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              Classico
            </button>
            <button
              onClick={() => setButtonStyle('brutalist')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                buttonStyle === 'brutalist'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              Hard Shadow
            </button>
            <button
              onClick={() => setButtonStyle('sketch')}
              className={`px-2 py-0.5 rounded-xs font-mono transition-colors cursor-pointer ${
                buttonStyle === 'sketch'
                  ? 'bg-black text-white'
                  : 'hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              Sketch
            </button>
          </div>

          {/* Toggle Guides */}
          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`border-2 border-black px-2 py-1 rounded-xs flex items-center gap-1 font-mono cursor-pointer transition-colors ${
              showGuides
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-zinc-100'
            }`}
            title="Mostra guide di allineamento al centro"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Guide</span>
          </button>

          {/* Uppercase toggle */}
          <button
            onClick={() => setIsUppercase(!isUppercase)}
            className={`border-2 border-black px-2 py-1 rounded-xs flex items-center gap-1 font-mono cursor-pointer transition-colors ${
              isUppercase
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-zinc-100'
            }`}
            title="Maiuscolo / Minuscolo"
          >
            <span>{isUppercase ? 'AA' : 'aa'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center border-2 border-black bg-white rounded-xs overflow-hidden font-mono text-xs">
            <button
              onClick={() => {
                setAutoScale(false);
                setScale((prev) => Math.max(0.5, Math.round((prev - 0.1) * 10) / 10));
              }}
              className="px-2 py-1 hover:bg-zinc-100 cursor-pointer border-r border-black"
              title="Riduci"
            >
              -
            </button>
            <span className="px-2 py-1 min-w-[50px] text-center font-bold">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => {
                setAutoScale(false);
                setScale((prev) => Math.min(1.1, Math.round((prev + 0.1) * 10) / 10));
              }}
              className="px-2 py-1 hover:bg-zinc-100 cursor-pointer border-l border-black"
              title="Ingrandisci"
            >
              +
            </button>
            <button
              onClick={() => setAutoScale(!autoScale)}
              className={`px-2 py-1 cursor-pointer border-l border-black transition-colors ${
                autoScale ? 'bg-black text-white' : 'hover:bg-zinc-100'
              }`}
              title="Adatta automaticamente allo schermo"
            >
              Fit
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="border-2 border-black bg-white px-2.5 py-1 rounded-xs flex items-center gap-1 font-mono hover:bg-zinc-100 active:translate-y-0.5 cursor-pointer"
            title="Torna a Pagina 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Main Workspace with drafting desk appearance */}
      <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
        {/* Background drafting grid pattern */}
        <div className="absolute inset-0 pointer-events-none wireframe-dense-grid opacity-60" />

        {/* iPhone 11 Frame */}
        <IPhone11Frame
          showGrid={gridStyle !== 'none'}
          gridType={gridStyle}
          scale={scale}
          showRulers={true}
        >
          {/* Alignment Center Guides (Togglable) */}
          {showGuides && (
            <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
              {/* Horizontal center dashed line */}
              <div className="absolute w-full h-[1px] border-t border-dashed border-zinc-400" />
              {/* Vertical center dashed line */}
              <div className="absolute h-full w-[1px] border-l border-dashed border-zinc-400" />
              {/* Center point marker */}
              <div className="w-4 h-4 rounded-full border border-zinc-500 flex items-center justify-center">
                <div className="w-1 h-1 bg-zinc-800 rounded-full" />
              </div>
            </div>
          )}

          {/* Page Indicator Tag inside mobile screen (Subtle wireframe watermark) */}
          <div className="absolute top-2 left-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest z-15 select-none">
            {currentPage === 1 ? 'PAGINA 1 / 2' : 'PAGINA 2 / 2'}
          </div>

          {/* Animated Page Transitions */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {currentPage === 1 ? (
                /* ================= PAGINA 1 ================= */
                /* "Pagina 1: con dentro solo un bottone con scritto 'avanti'" */
                <motion.div
                  key="page-1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.15 },
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <button
                    onClick={handleNext}
                    className={getButtonClasses()}
                    aria-label="Avanti"
                  >
                    <span className="flex items-center gap-2">
                      {isUppercase ? 'AVANTI' : 'avanti'}
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </button>
                </motion.div>
              ) : (
                /* ================= PAGINA 2 ================= */
                /* "Pagina 2: con dentro solo un bottone con scritto 'indietro'" */
                <motion.div
                  key="page-2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.15 },
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <button
                    onClick={handleBack}
                    className={getButtonClasses()}
                    aria-label="Indietro"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      {isUppercase ? 'INDIETRO' : 'indietro'}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </IPhone11Frame>
      </div>

      {/* Footer Info / Specs Bar */}
      <footer className="w-full bg-white border-t-2 border-black px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-700 select-none z-30">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black">FORMATO: iPhone 11</span>
          <span className="hidden sm:inline text-zinc-400">|</span>
          <span className="hidden sm:inline">Viewport: 414 × 896 pt</span>
          <span className="hidden md:inline text-zinc-400">|</span>
          <span className="hidden md:inline">Aspect Ratio: 19.5:9</span>
        </div>

        <div className="flex items-center gap-3 text-zinc-600">
          <span>Stato: {currentPage === 1 ? 'Pagina 1 (avanti)' : 'Pagina 2 (indietro)'}</span>
          <span className="text-zinc-400">|</span>
          <span>Interazioni: {clickCount}</span>
        </div>
      </footer>
    </div>
  );
}
