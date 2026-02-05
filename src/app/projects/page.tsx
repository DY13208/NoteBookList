import React from 'react';

export default function ProjectBoard() {
  return (
    <div className="font-nunito bg-s6-page-bg text-s6-text-main min-h-screen selection:bg-s6-mint selection:text-white overflow-x-hidden antialiased">
      <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-s6-page-bg overflow-hidden border-x-2 border-s6-border-dark">
        {/* Header */}
        <div className="flex items-center px-6 pt-12 pb-6 justify-between sticky top-0 z-50 bg-s6-page-bg/95 backdrop-blur-sm border-b-2 border-s6-border-dark">
          <button className="bold-btn w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">arrow_back</span>
          </button>
          <h2 className="text-xl font-black tracking-tight text-s6-text-main uppercase">Project Board</h2>
          <button className="bold-btn w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">more_horiz</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6 pb-48 pt-6">
          {/* Active Project Card */}
          <div className="bg-white rounded-2xl p-6 relative overflow-hidden group border-2 border-s6-border-dark shadow-bold">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-white bg-s6-primary rounded border-2 border-s6-border-dark shadow-bold-sm">
                  Active
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-s6-coral-light border-2 border-s6-border-dark flex items-center justify-center text-s6-coral shadow-bold-sm">
                <span className="material-symbols-outlined font-bold">favorite</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <h1 className="text-3xl font-black text-s6-text-main tracking-tight">UI Mastery</h1>
              <p className="text-sm text-s6-text-muted font-bold leading-relaxed border-l-4 border-s6-primary pl-3">
                Build a comprehensive design system &amp; finish 3 high-fidelity prototypes.
              </p>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 border-2 border-s6-border-dark relative h-40 w-full overflow-hidden flex items-center justify-center shadow-inner">
              <img
                alt="Chiikawa and Friends Illustration"
                className="w-full h-full object-cover opacity-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTifztoXnNHWx0syjXp6Y1qQqgcX9MPiBy3_Yr0ecTQq31lHJHo20dIgCVF0PyTqILtqkorwgPHFALb_WZAqdrwHPdfROGplQ7tSMs-Qe1qiXZyDYdzCB0fXSDUNo2_IlRzUcrOaVb0qb03o0cD7V1xv9kL1OSsC9QfaZfBSB9pFs_gsiPZ1IazQZH2XzHhjlsNq-f7fK6-AZM7urykjBulOvNiWTPIc7nDQGiwh7qkzPjVi2bBHLQqIe0WbMp7lnSqr0Dv6cnis8"
              />
              <div className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded border-2 border-s6-border-dark shadow-bold-sm">
                <span className="text-xs font-black text-s6-text-main uppercase">Chiikawa &amp; Co.</span>
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <div className="flex justify-between text-xs font-black text-s6-text-main uppercase mb-2">
                <span>Progress</span>
                <span className="text-s6-primary bg-indigo-50 px-2 rounded border border-indigo-100">45%</span>
              </div>
              <div className="border-2 border-s6-border-dark rounded-full bg-white h-4 w-full overflow-hidden relative">
                <div className="h-full w-[45%] bg-s6-primary border-r-2 border-s6-border-dark"></div>
              </div>
            </div>
          </div>

          {/* AI Breakdown Button */}
          <button className="w-full bg-white border-2 border-s6-border-dark rounded-2xl p-1 flex items-center justify-between group active:translate-y-1 active:shadow-bold-active transition-all shadow-bold">
            <div className="flex items-center gap-4 w-full p-3 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-s6-primary border-2 border-s6-border-dark flex items-center justify-center text-white shrink-0 shadow-sm">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-black text-s6-text-main">AI Breakdown</span>
                <span className="text-xs text-s6-text-muted font-bold">Auto-generate next steps</span>
              </div>
              <div className="ml-auto text-s6-text-main group-hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </div>
            </div>
          </button>

          {/* Active Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-black text-s6-text-main uppercase flex items-center gap-2">
                Active Tasks
                <span className="text-xs bg-s6-primary text-white border-2 border-s6-border-dark px-2 py-0.5 rounded font-bold shadow-[2px_2px_0px_#000]">
                  3
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-s6-mint-light/30 border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 shadow-bold-sm">
                <div className="relative flex items-center">
                  <input checked readOnly className="bold-checkbox" type="checkbox" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-base font-bold text-s6-text-muted line-through decoration-2 decoration-s6-border-dark/50">
                    Research Design Systems
                  </span>
                </div>
                <div className="text-s6-mint">
                  <span className="material-symbols-outlined font-bold">check_circle</span>
                </div>
              </div>
              <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 relative overflow-visible shadow-bold transition-transform hover:-translate-y-1 hover:shadow-bold-lg">
                <div className="relative flex items-center">
                  <input className="bold-checkbox peer" type="checkbox" />
                  <div className="absolute -top-16 -left-4 w-32 pointer-events-none z-50 flex-col items-center hidden peer-checked:flex animate-pop-up-bounce">
                    <div className="relative bg-white border-2 border-s6-border-dark rounded-xl px-3 py-1 shadow-[3px_3px_0px_#1E293B] mb-1">
                      <span className="text-sm font-black text-s6-text-main">YAH!</span>
                      <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white border-b-2 border-r-2 border-s6-border-dark transform rotate-45"></div>
                    </div>
                    <div className="text-4xl filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">🐰</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-base font-bold text-s6-text-main">Create Color Palette</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-white bg-s6-coral border border-s6-border-dark px-2 py-0.5 rounded shadow-[2px_2px_0px_#1E293B]">
                      Urgent
                    </span>
                    <span className="text-xs text-s6-text-muted font-bold">• 2h est.</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 relative overflow-visible shadow-bold-sm hover:shadow-bold transition-all">
                <div className="relative flex items-center">
                  <input className="bold-checkbox" type="checkbox" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-base font-bold text-s6-text-main">Draft Component Library</span>
                  <span className="text-xs text-s6-text-muted mt-0.5 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">event</span> Tomorrow
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-black text-s6-text-main px-1 mb-4 uppercase">Resources</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-all cursor-pointer shadow-bold active:shadow-bold-active active:translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 border-2 border-s6-border-dark flex items-center justify-center text-s6-primary shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">menu_book</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-s6-text-main">Refactoring UI</p>
                  <p className="text-[10px] text-s6-text-main font-bold uppercase tracking-wider mt-1 bg-slate-100 border border-s6-border-dark px-2 py-0.5 rounded inline-block">
                    PDF • 214pg
                  </p>
                </div>
              </div>
              <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-all cursor-pointer shadow-bold active:shadow-bold-active active:translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 border-2 border-s6-border-dark flex items-center justify-center text-s6-accent-yellow shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">link</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-s6-text-main">Figma System</p>
                  <p className="text-[10px] text-s6-text-main font-bold uppercase tracking-wider mt-1 bg-slate-100 border border-s6-border-dark px-2 py-0.5 rounded inline-block">
                    External
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAB - Increased bottom offset to avoid overlap with nav */}
        <button className="fixed bottom-24 right-8 w-14 h-14 bg-s6-primary text-white rounded-2xl shadow-bold flex items-center justify-center hover:scale-105 active:scale-95 active:shadow-bold-active transition-all z-50 border-2 border-s6-border-dark">
          <span className="material-symbols-outlined text-2xl font-bold">edit</span>
        </button>
      </div>
    </div>
  );
}
