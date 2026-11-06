import React from 'react';
import { Wifi, BatteryMedium, SignalMedium } from 'lucide-react';

interface IPhone11FrameProps {
  children: React.ReactNode;
  showGrid?: boolean;
  gridType?: 'blueprint' | 'dots' | 'none';
  scale?: number;
  showRulers?: boolean;
  currentPage?: 1 | 2;
}

export const IPhone11Frame: React.FC<IPhone11FrameProps> = ({
  children,
  showGrid = true,
  gridType = 'blueprint',
  scale = 1,
  showRulers = true,
  currentPage = 1,
}) => {
  const isPage1 = currentPage === 1;

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none">
      {/* Dimension callouts (Architectural wireframe annotation) */}
      {showRulers && (
        <>
          {/* Top Width Ruler */}
          <div className="hidden md:flex items-center justify-center gap-2 mb-3 text-xs font-mono text-zinc-500">
            <span className="w-8 h-[1px] bg-zinc-400"></span>
            <span className="px-1.5 py-0.5 border border-zinc-400 bg-white rounded-xs">
              L: 414 pt (iPhone 11)
            </span>
            <span className="w-8 h-[1px] bg-zinc-400"></span>
          </div>

          {/* Left Height Ruler */}
          <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 flex-col items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="h-12 w-[1px] bg-zinc-400"></span>
            <span className="px-1.5 py-0.5 border border-zinc-400 bg-white rounded-xs [writing-mode:vertical-lr] rotate-180">
              H: 896 pt (iPhone 11)
            </span>
            <span className="h-12 w-[1px] bg-zinc-400"></span>
          </div>
        </>
      )}

      {/* Main Outer Phone Chassis Wrapper with scale applied */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        className="transition-transform duration-200 ease-out"
      >
        {/* iPhone 11 Outer Chassis */}
        <div className="relative w-[438px] h-[920px] bg-white border-[3px] border-black rounded-[54px] shadow-[12px_12px_0px_0px_#000000] p-[10px] flex flex-col items-center justify-center">
          
          {/* Hardware Physical Buttons (Wireframe Style) */}
          {/* Mute switch (Left) */}
          <div className="absolute -left-[9px] top-[140px] w-[6px] h-[32px] bg-white border-2 border-black rounded-l-md" />
          {/* Volume Up (Left) */}
          <div className="absolute -left-[9px] top-[195px] w-[6px] h-[58px] bg-white border-2 border-black rounded-l-md" />
          {/* Volume Down (Left) */}
          <div className="absolute -left-[9px] top-[268px] w-[6px] h-[58px] bg-white border-2 border-black rounded-l-md" />
          {/* Side Power Button (Right) */}
          <div className="absolute -right-[9px] top-[210px] w-[6px] h-[78px] bg-white border-2 border-black rounded-r-md" />

          {/* Corner Antenna Bands (Subtle wireframe details) */}
          <div className="absolute top-[85px] left-0 w-[4px] h-[4px] bg-black" />
          <div className="absolute top-[85px] right-0 w-[4px] h-[4px] bg-black" />
          <div className="absolute bottom-[85px] left-0 w-[4px] h-[4px] bg-black" />
          <div className="absolute bottom-[85px] right-0 w-[4px] h-[4px] bg-black" />

          {/* Screen Bezel & Active Display (414 x 896 pt) */}
          <div className="relative w-[414px] h-[896px] bg-white border-2 border-black rounded-[44px] overflow-hidden flex flex-col">
            
            {/* Optional Wireframe Grid Background inside Screen */}
            {showGrid && gridType !== 'none' && (
              <div
                className={`absolute inset-0 pointer-events-none z-1 ${
                  gridType === 'blueprint'
                    ? 'wireframe-blueprint-grid'
                    : 'wireframe-dot-grid'
                } opacity-30`}
              />
            )}

            {/* Wireframe Notch (Classic iPhone 11 Shape) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[190px] h-[30px] bg-white border-b-2 border-x-2 border-black rounded-b-[20px] z-30 flex items-center justify-center shadow-[0px_2px_0px_#000000] pointer-events-none">
              {/* Speaker Earpiece Slit */}
              <div className="w-[48px] h-[5px] border border-black bg-zinc-200 rounded-full" />
              {/* Camera Lens Circle */}
              <div className="absolute right-5 w-[10px] h-[10px] border border-black bg-white rounded-full flex items-center justify-center">
                <div className="w-[3px] h-[3px] bg-black rounded-full" />
              </div>
            </div>

            {/* iOS Status Bar (Overlays top) */}
            <header
              className={`absolute top-0 left-0 right-0 w-full h-[44px] px-8 flex items-center justify-between text-xs font-semibold select-none z-20 pointer-events-none transition-colors duration-200 ${
                isPage1 ? 'text-white' : 'text-black'
              }`}
            >
              {/* Time */}
              <div className="font-mono text-xs tracking-tight pl-1 font-bold">9:41</div>

              {/* Status Icons */}
              <div className="flex items-center gap-2 pr-1">
                <SignalMedium className="w-4 h-4 stroke-[2.2]" />
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
                <div className="flex items-center gap-0.5">
                  <div
                    className={`w-[22px] h-[11px] border-[1.5px] rounded-xs p-[1px] flex items-center ${
                      isPage1 ? 'border-white' : 'border-black'
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-[1px] ${
                        isPage1 ? 'bg-white' : 'bg-black'
                      }`}
                    />
                  </div>
                  <div
                    className={`w-[1.5px] h-[4px] rounded-r-xs ${
                      isPage1 ? 'bg-white' : 'bg-black'
                    }`}
                  />
                </div>
              </div>
            </header>

            {/* Main Application Content Container (Full-height for complete page backgrounds) */}
            <main className="relative flex-1 w-full h-full overflow-hidden z-10 flex flex-col">
              {children}
            </main>

            {/* Home Indicator Bar (Wireframe iPhone standard) */}
            <footer className="absolute bottom-0 left-0 right-0 w-full h-[34px] flex items-center justify-center pointer-events-none z-20 pb-2">
              <div
                className={`w-[136px] h-[5px] rounded-full transition-colors duration-200 border ${
                  isPage1
                    ? 'bg-white border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-black border-black'
                }`}
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
