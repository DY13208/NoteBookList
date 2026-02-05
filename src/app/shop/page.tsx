import React from 'react';

export default function PointsShop() {
  return (
    <div className="font-jakarta bg-s3-background-light dark:bg-s3-background-dark text-slate-900 dark:text-white antialiased selection:bg-s3-primary selection:text-white min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#121212] p-4 pb-3 justify-between border-b-2 border-gray-100 dark:border-white/10">
          <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors active:scale-95">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase">
            Shop
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:scale-95">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-32">
          {/* Welcome Card */}
          <div className="w-full flex flex-col overflow-hidden rounded-2xl bg-[#FFF0F5] dark:bg-pink-900/20 border-2 border-s3-primary/20 dark:border-s3-primary/40 shadow-none">
            <div className="w-full aspect-[2/1] bg-[#FFDEEB] relative flex items-end justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-900 relative flex items-center justify-center translate-y-4">
                  <div className="absolute top-8 left-6 w-2 h-2 bg-slate-900 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-slate-900 rounded-full"></div>
                  <div className="w-2 h-1 bg-pink-300 rounded-full mt-2"></div>
                </div>
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-900 relative flex items-center justify-center translate-y-4 overflow-hidden">
                  <div className="absolute top-0 w-full h-8 bg-[#8BB7F0]"></div>
                  <div className="absolute top-8 left-6 w-2 h-2 bg-slate-900 rounded-full z-10"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-slate-900 rounded-full z-10"></div>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col items-center text-center bg-[#FFF0F5] dark:bg-transparent border-t-2 border-s3-primary/10">
              <h1 className="text-2xl font-black text-s3-primary mb-1 tracking-tight">Welcome!</h1>
              <p className="text-slate-600 dark:text-pink-100 font-bold text-sm">Spend your hard-earned points here.</p>
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex flex-col items-center justify-center py-2 bg-s3-surface dark:bg-white/5 rounded-2xl border-2 border-transparent">
            <div className="bg-s3-primary/10 dark:bg-s3-primary/30 px-4 py-1.5 rounded-lg mb-2">
              <p className="text-xs font-black text-s3-primary uppercase tracking-widest">Your Balance</p>
            </div>
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-4xl text-yellow-400">monetization_on</span>
              <h2 className="tracking-tight text-5xl font-black leading-tight">1,540</h2>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-s3-primary text-white px-6 shadow-none transition-transform active:scale-95 border-2 border-s3-primary">
              <span className="text-sm font-extrabold">All</span>
            </button>
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-white/5 text-slate-600 dark:text-gray-300 px-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors border-2 border-gray-200 dark:border-white/10 active:scale-95">
              <span className="text-sm font-extrabold">Themes</span>
            </button>
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-white/5 text-slate-600 dark:text-gray-300 px-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors border-2 border-gray-200 dark:border-white/10 active:scale-95">
              <span className="text-sm font-extrabold">Icons</span>
            </button>
          </div>

          {/* Themes Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">Themes</h3>
              <button className="text-s3-primary text-sm font-black hover:opacity-80 uppercase tracking-wide">
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group flex flex-col gap-3 p-3 bg-white dark:bg-white/5 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-s3-primary/50 transition-colors">
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden relative bg-[#F8BBD0] flex items-center justify-center border-2 border-transparent">
                  <div className="text-6xl select-none animate-bounce" style={{ animationDuration: '3s' }}>
                    🐰
                  </div>
                  <div className="absolute top-2 left-2 bg-yellow-400 text-slate-900 rounded px-2 py-1 shadow-none border-2 border-yellow-500">
                    <span className="text-[10px] font-black uppercase tracking-wider">New</span>
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <h4 className="text-slate-900 dark:text-white font-black text-base">Pastel Usagi</h4>
                  <div className="flex items-center gap-1 text-s3-primary mt-1">
                    <span className="text-xs font-black bg-s3-primary/10 px-2 py-1 rounded text-s3-primary">500 PTS</span>
                  </div>
                </div>
                <button className="w-full h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-extrabold hover:bg-slate-700 transition-colors flex items-center justify-center active:scale-95">
                  Redeem
                </button>
              </div>
              <div className="group flex flex-col gap-3 p-3 bg-white dark:bg-white/5 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-s3-primary/50 transition-colors">
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden relative bg-[#B3E5FC] flex items-center justify-center border-2 border-transparent">
                  <div className="text-6xl select-none animate-pulse" style={{ animationDuration: '4s' }}>
                    🐙
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <h4 className="text-slate-900 dark:text-white font-black text-base">Deep Sea Hachi</h4>
                  <div className="flex items-center gap-1 text-s3-primary mt-1">
                    <span className="text-xs font-black bg-s3-primary/10 px-2 py-1 rounded text-s3-primary">750 PTS</span>
                  </div>
                </div>
                <button className="w-full h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-extrabold hover:bg-slate-700 transition-colors flex items-center justify-center active:scale-95">
                  Redeem
                </button>
              </div>
            </div>
          </div>

          {/* App Icons Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">App Icons</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-white/5 p-3 border-2 border-gray-100 dark:border-white/10 hover:border-s3-primary/50 transition-colors">
                <div className="size-16 shrink-0 rounded-xl bg-[#FFCDD2] flex items-center justify-center text-2xl">😊</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-black text-base truncate">Chiikawa Faces</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">12 Custom Icons</p>
                </div>
                <button className="h-9 bg-s3-primary/10 text-s3-primary px-4 rounded-lg text-xs font-black hover:bg-s3-primary hover:text-white transition-colors uppercase">
                  300 PTS
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-white/5 p-3 border-2 border-gray-100 dark:border-white/10 hover:border-s3-primary/50 transition-colors">
                <div className="size-16 shrink-0 rounded-xl bg-[#E1BEE7] flex items-center justify-center text-2xl">🪄</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-black text-base truncate">Magic Wands</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">8 Custom Icons</p>
                </div>
                <button className="h-9 bg-s3-primary/10 text-s3-primary px-4 rounded-lg text-xs font-black hover:bg-s3-primary hover:text-white transition-colors uppercase">
                  250 PTS
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-white/5 p-3 border-2 border-transparent opacity-60">
                <div className="size-16 shrink-0 rounded-xl bg-[#CFD8DC] flex items-center justify-center text-2xl grayscale opacity-50">
                  ⭐
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-black text-base truncate">Golden Stars</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">Lvl 10 Required</p>
                </div>
                <button className="h-9 bg-gray-200 dark:bg-white/10 text-gray-400 px-4 rounded-lg text-xs font-black flex items-center gap-1 cursor-not-allowed uppercase">
                  <span className="material-symbols-outlined text-[16px] font-bold">lock</span> 1000
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
