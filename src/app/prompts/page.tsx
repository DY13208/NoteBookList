import React from 'react';

export default function PromptManager() {
  return (
    <div className="font-jakarta bg-s2-background-light text-s2-text-main min-h-screen">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-s2-background-light border-b-2 border-s2-border-bold">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-s2-border-bold shadow-flat-sm active:shadow-flat-active active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer">
            <span className="material-symbols-outlined text-s2-text-main" style={{ fontSize: '24px' }}>
              arrow_back
            </span>
          </div>
          <h2 className="text-s2-text-main text-xl font-extrabold leading-tight tracking-[-0.015em] flex-1 text-center uppercase">
            Prompt Manager
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white border-2 border-s2-border-bold shadow-flat-sm active:shadow-flat-active active:translate-x-[2px] active:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined text-s2-text-main" style={{ fontSize: '24px' }}>
                more_vert
              </span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-4 py-4">
          <div className="w-full bg-[#E0F7FA] border-2 border-s2-border-bold rounded-xl shadow-flat overflow-hidden relative min-h-[180px] flex items-center justify-between p-6">
            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-white rounded-full border-2 border-s2-border-bold opacity-50"></div>
            <div className="absolute bottom-[-10px] right-[40%] w-16 h-16 bg-s2-primary rounded-full border-2 border-s2-border-bold opacity-50"></div>
            <div className="z-10 relative max-w-[60%]">
              <h1 className="text-s2-text-main text-2xl font-black mb-2 leading-tight">
                Prompt<br />Collection
              </h1>
              <p className="text-s2-text-main font-bold text-sm bg-white border-2 border-s2-border-bold px-3 py-1 rounded-full inline-block shadow-flat-sm">
                Organized by Hachiware!
              </p>
            </div>
            <div className="absolute right-[-10px] bottom-[-20px] w-[160px] h-[160px] z-10">
              <img
                alt="Chiikawa and Hachiware"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqCMSwot3cgTJ8e6ZufRU9xj6qTguHzKy7Yyos0eNwf1UGNk16qemIAaC24n9ku8GmEHc1mUqi78pL8-VnumpeSl2cpK-uSsBCuiePNxqNniz05PsVQdr0wadmB3QRIZw3bfNuT8slTUR-4Y_fv8BBxKk2zKdfXPPmgV5N39COeBC87etEt4N3_sItyncLJjiINaLF0mWS8EZShzrx60k3LBdETJ-wDJomUmcLBFErQFQx-hlo2UpovvkTuQ7yhNpjA33vXcFxHcI"
                style={{ filter: 'drop-shadow(2px 2px 0px #2D2D2D)' }}
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <label className="flex flex-col h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl border-2 border-s2-border-bold bg-white shadow-flat transition-all focus-within:shadow-flat-hover">
              <div className="text-s2-text-main flex items-center justify-center pl-4">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  search
                </span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-transparent px-4 text-base font-bold text-s2-text-main placeholder:text-gray-400 focus:outline-0 focus:ring-0"
                placeholder="Find a prompt..."
              />
            </div>
          </label>
        </div>

        {/* Categories */}
        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar pb-6">
          <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-s2-primary border-2 border-s2-border-bold px-5 shadow-flat-sm cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-flat-active transition-all">
            <p className="text-s2-text-main text-sm font-extrabold">All</p>
          </div>
          <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border-2 border-s2-border-bold px-5 shadow-flat-sm cursor-pointer hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-flat-active transition-all">
            <p className="text-s2-text-main text-sm font-bold">Study Assistant</p>
          </div>
          <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border-2 border-s2-border-bold px-5 shadow-flat-sm cursor-pointer hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-flat-active transition-all">
            <p className="text-s2-text-main text-sm font-bold">Code Review</p>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-8 bg-s2-secondary border-2 border-s2-border-bold rounded-sm"></div>
            <h3 className="text-s2-text-main text-xl font-extrabold uppercase">Recent Prompts</h3>
          </div>
          <span className="text-s2-text-main text-sm font-bold border-b-2 border-s2-primary cursor-pointer hover:bg-s2-primary/20 transition-colors">
            View All
          </span>
        </div>

        {/* Prompt Cards */}
        <div className="flex flex-col gap-6 px-4 pb-32">
          <div className="group flex flex-col rounded-xl bg-white border-2 border-s2-border-bold p-0 shadow-flat hover:shadow-flat-hover transition-all duration-200">
            <div className="flex justify-between items-start p-4 border-b-2 border-s2-border-bold bg-[#F3E5F5]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border-2 border-s2-border-bold text-s2-text-main">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h4 className="text-s2-text-main text-lg font-extrabold leading-tight">Physics Explainer</h4>
                  <div className="bg-white border border-s2-border-bold px-2 py-0.5 rounded-md inline-block mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-s2-text-main text-xs font-bold uppercase tracking-wide">Study Assistant</p>
                  </div>
                </div>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-s2-border-bold shadow-flat-sm active:translate-y-1 active:shadow-none transition-all text-s2-text-main hover:bg-s2-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  star
                </span>
              </button>
            </div>
            <div className="p-4 bg-white rounded-b-xl">
              <div className="mb-4 bg-s2-background-light p-3 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-s2-text-main font-medium text-sm line-clamp-2 leading-relaxed italic">
                  &quot;Explain quantum entanglement to me as if I were a 10-year-old, using analogies involving
                  toys...&quot;
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-md bg-s2-secondary border-2 border-s2-border-bold px-2 py-1 text-xs font-bold text-s2-text-main">
                    #physics
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#FFCCBC] border-2 border-s2-border-bold px-2 py-1 text-xs font-bold text-s2-text-main">
                    #simplify
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-s2-text-main bg-gray-100 px-2 py-1 rounded border-2 border-transparent">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    repeat
                  </span>
                  <span>12x</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group flex flex-col rounded-xl bg-white border-2 border-s2-border-bold p-0 shadow-flat hover:shadow-flat-hover transition-all duration-200">
            <div className="flex justify-between items-start p-4 border-b-2 border-s2-border-bold bg-[#E8F5E9]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border-2 border-s2-border-bold text-s2-text-main">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div>
                  <h4 className="text-s2-text-main text-lg font-extrabold leading-tight">React Clean</h4>
                  <div className="bg-white border border-s2-border-bold px-2 py-0.5 rounded-md inline-block mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-s2-text-main text-xs font-bold uppercase tracking-wide">Code Review</p>
                  </div>
                </div>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-s2-primary border-2 border-s2-border-bold shadow-flat-sm active:translate-y-1 active:shadow-none transition-all text-s2-text-main">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  star
                </span>
              </button>
            </div>
            <div className="p-4 bg-white rounded-b-xl">
              <div className="mb-4 bg-s2-background-light p-3 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-s2-text-main font-medium text-sm line-clamp-2 leading-relaxed italic">
                  &quot;Analyze this React component for performance bottlenecks and suggest refactoring for better readability...&quot;
                </p>
              </div>
              <div className="mb-4 rounded-lg bg-s2-primary/20 border-2 border-s2-border-bold p-2 flex items-center gap-2">
                <div className="bg-white border-2 border-s2-border-bold p-1 rounded-md flex items-center justify-center w-6 h-6">
                  <span className="material-symbols-outlined text-xs text-s2-text-main" style={{ fontSize: '14px' }}>
                    link
                  </span>
                </div>
                <span className="text-xs font-bold text-s2-text-main">
                  Required for: <span className="underline decoration-2">Dashboard V2</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-md bg-[#B2EBF2] border-2 border-s2-border-bold px-2 py-1 text-xs font-bold text-s2-text-main">
                    #react
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#FFF9C4] border-2 border-s2-border-bold px-2 py-1 text-xs font-bold text-s2-text-main">
                    #refactor
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-s2-text-main bg-gray-100 px-2 py-1 rounded border-2 border-transparent">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    repeat
                  </span>
                  <span>45x</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAB - Increased bottom offset to avoid overlap with nav */}
        <div className="fixed bottom-24 right-6 z-40">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-s2-accent border-2 border-s2-border-bold text-white shadow-flat hover:shadow-flat-hover active:translate-y-1 active:shadow-flat-active transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
