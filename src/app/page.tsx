import React from 'react';
import Link from 'next/link';

export default function Workbench() {
  return (
    <div className="font-nunito antialiased min-h-screen pb-32 bg-s1-bg-base text-s1-text-main selection:bg-s1-flat-pink selection:text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-s1-surface px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="size-12 rounded-xl overflow-hidden border-2 border-s1-surface bg-s1-surface relative z-10">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqCC2A2_Con2asXLsbO3dHLYPOmvtXiK-DENlbmK-w9BZLH_wvgqRRkQHxVV_FWw4159YEH3YQvQ2DtiRT5a_hnQgODbXmWSx118BT2CtJ0gDh70k33SyniXEFp4wfHHK1_aiK0tXtptwJspws-U_689W219nDKfk6nPoGTHqfHQyW225sao3z2WY4MlVftKZ64iDgfozliG6FeioSKVtubiqBt9u52rIxkn-lsZet4mySsYPNmtwRQHLf294fjBPUc1esghlQnNQ")',
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest text-s1-text-sub uppercase font-rounded">
                Chiikawa OS
              </span>
              <h2 className="font-rounded text-lg font-black text-s1-text-main leading-none">
                Alex&apos;s Space
              </h2>
            </div>
          </div>
          <button className="relative size-11 flex items-center justify-center rounded-xl bg-s1-surface text-s1-text-main hover:bg-s1-flat-yellow hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-4 right-4 size-2 rounded-full bg-s1-flat-pink border border-white"></span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-8 pb-2">
        <h1 className="font-rounded text-s1-text-main text-[2.5rem] font-black leading-tight">
          Good morning,<br />
          <span className="text-s1-flat-blue">Alex!</span>
        </h1>
      </div>

      {/* Weekly Insight Card */}
      <div className="px-6 mt-6 mb-8 relative">
        <div className="bg-s1-flat-yellow rounded-3xl p-6 relative overflow-visible">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-5 translate-y-5"></div>
          <div className="relative z-10 flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20">
              <span className="material-symbols-outlined text-white text-[18px]">auto_awesome</span>
              <span className="text-xs font-black font-rounded text-white uppercase tracking-wide">
                Weekly Insight
              </span>
            </div>
            <div className="absolute -top-12 -right-2 z-20 animate-float">
              <div className="relative flex flex-col items-center">
                <div className="bg-white px-3 py-1 rounded-lg border-2 border-s1-text-main mb-1">
                  <span className="text-xs font-black text-s1-text-main">YAH!!</span>
                </div>
                <div className="text-[72px] leading-none filter drop-shadow-none grayscale-0">🐰</div>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-4 pr-16">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-s1-text-main font-rounded">100</span>
              <span className="text-2xl font-black text-s1-text-main">%</span>
            </div>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-4 border-2 border-transparent">
              <div className="bg-s1-text-main h-full w-full rounded-full"></div>
            </div>
            <p className="text-sm text-s1-text-main font-bold leading-relaxed mb-6 font-rounded opacity-90 pr-4">
              Spanish Vocabulary targets crushed! <br />Usagi is screaming with excitement.
            </p>
            <div className="flex gap-3">
              <button className="flex-1 rounded-xl bg-white py-3 text-sm font-black text-s1-text-main border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 hover:bg-gray-50 transition-all">
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Focus Section */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-s1-surface rounded-xl flex items-center justify-center text-2xl">🐹</div>
            <div>
              <h3 className="font-rounded text-s1-text-main text-xl font-black leading-none">Today&apos;s Focus</h3>
              <span className="text-xs font-bold text-s1-text-sub">Chiikawa is studying...</span>
            </div>
          </div>
        <Link href="/notes" className="text-xs font-black text-s1-flat-blue uppercase bg-s1-flat-blue/10 px-3 py-1.5 rounded-lg hover:bg-s1-flat-blue hover:text-white transition-colors">
          查看全部
        </Link>
        </div>
        <div className="flex flex-col gap-3">
          <label className="group relative bg-s1-surface rounded-2xl p-4 cursor-pointer border-2 border-transparent hover:border-s1-flat-blue transition-all">
            <div className="flex items-start gap-4">
              <div className="relative pt-1">
                <input className="checkbox-flat" type="checkbox" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <p className="text-s1-text-main text-lg font-black leading-tight font-rounded">Python Chapter 4</p>
                  <span className="text-[10px] font-black text-white bg-s1-flat-blue px-2 py-1 rounded">LEARNING</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-s1-text-sub text-[16px]">schedule</span>
                  <span className="text-xs text-s1-text-sub font-bold">45m remaining</span>
                </div>
              </div>
            </div>
          </label>
          <label className="group relative bg-s1-surface rounded-2xl p-4 cursor-pointer border-2 border-transparent hover:border-s1-flat-pink transition-all">
            <div className="flex items-start gap-4">
              <div className="relative pt-1">
                <input className="checkbox-flat" type="checkbox" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <p className="text-s1-text-main text-lg font-black leading-tight font-rounded">Project Outline</p>
                  <span className="text-[10px] font-black text-white bg-s1-flat-pink px-2 py-1 rounded">PROJECT</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-s1-flat-pink text-[16px] fill-current">warning</span>
                  <span className="text-xs text-s1-flat-pink font-extrabold">Due Tomorrow</span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Quick Capture Section */}
      <div className="px-6 py-6">
        <h3 className="font-rounded text-s1-text-main text-lg font-black mb-4">Quick Capture</h3>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/notes" className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-blue rounded-2xl py-5 active:scale-95 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">document_scanner</span>
            <span className="text-xs font-black text-white uppercase">Scan</span>
          </Link>
          <Link href="/notes" className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-pink rounded-2xl py-5 active:scale-95 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">mic</span>
            <span className="text-xs font-black text-white uppercase">Voice</span>
          </Link>
          <Link href="/notes" className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-mint rounded-2xl py-5 active:scale-95 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">edit_note</span>
            <span className="text-xs font-black text-white uppercase">Note</span>
          </Link>
        </div>
      </div>

      {/* Recent Notes Section */}
      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-s1-surface rounded-xl flex items-center justify-center text-2xl">🐱</div>
            <div>
              <h3 className="font-rounded text-s1-text-main text-xl font-black leading-none">Recent Notes</h3>
              <span className="text-xs font-bold text-s1-text-sub">Hachiware is smiling!</span>
            </div>
          </div>
          <div className="flex gap-1 bg-s1-surface p-1 rounded-lg">
            <button className="rounded-md bg-white shadow-none p-1 text-s1-text-main">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button className="rounded-md hover:bg-white/50 p-1 text-s1-text-sub transition-colors">
              <span className="material-symbols-outlined text-[20px]">list</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/notes" className="group flex items-center gap-4 bg-s1-surface rounded-2xl p-3 pr-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-FjHY-KLLUSvGbG9icKiqgyjpjUukFTLy_gWWBr3MOTOGU2qJ7JvMM_cIyJXOpBnXykjbRAHFesqTcIFCqgwocIBk7cQ99S9_7Mn_3teppbAO35W-pbMPazmzZMeD80Kt34KIoSx6O_0weMYDWPX2_swrbJ-yGeMwOz4x-VHjsryXWF-CWiO_KsMksrmzIKnGSz9j9lLpElxxoFXgctcdjpogwdlS-UonqTqLeNNs-y_c1Yk8uwr8vxVlKQe9cPrLo_ap9hLcGWc")',
                }}
              ></div>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="font-rounded text-md font-black text-s1-text-main line-clamp-1">Neural Networks 101</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="rounded px-1.5 py-0.5 text-[10px] font-black text-white bg-s1-flat-blue uppercase">Note</span>
                <span className="text-xs text-s1-text-sub font-bold">2h ago</span>
              </div>
            </div>
            <div className="size-8 flex items-center justify-center rounded-lg text-s1-text-sub hover:bg-white hover:text-s1-text-main transition-all">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </div>
          </Link>
          <Link href="/notes" className="group flex items-center gap-4 bg-s1-surface rounded-2xl p-3 pr-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-xl bg-s1-flat-mint text-white">
              <span className="material-symbols-outlined text-[32px]">folder_open</span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="font-rounded text-md font-black text-s1-text-main line-clamp-1">History Research</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="rounded px-1.5 py-0.5 text-[10px] font-black text-white bg-s1-flat-mint uppercase">Project</span>
                <span className="text-xs text-s1-text-sub font-bold">Yesterday</span>
              </div>
            </div>
            <div className="size-8 flex items-center justify-center rounded-lg text-s1-text-sub hover:bg-white hover:text-s1-text-main transition-all">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </div>
          </Link>
          <Link href="/notes" className="group flex items-center gap-4 bg-s1-surface rounded-2xl p-3 pr-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyIdXqw2ALwQmov6LRVlXn21R1se-SpDp_F7NpfMk9qQ6K8TtSkv9mDm4RavZ2L3CWfF1PvPRGTSl5Q9VOXRdKK9A8GoM_tW0xmXG5qW66wUM4B-klLhv9jkeH6la_AaltrDOIvS3_GGRxnVyp7pwCiD2YA0ayjKLaovSINNUSIat9IAhR_7XB4WAN9rEbKVa0xGhTMiV7Gm_rnoI9QH3VpcYB69NVAYqSsaI01KQQnyFvZmEJWrDGY42pBXmSdqOdUI7tD4Z2LtU")',
                }}
              ></div>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="font-rounded text-md font-black text-s1-text-main line-clamp-1">Gardening Basics</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="rounded px-1.5 py-0.5 text-[10px] font-black text-white bg-green-500 uppercase">Course</span>
                <span className="text-xs text-s1-text-sub font-bold">30% Done</span>
              </div>
            </div>
            <div className="size-8 flex items-center justify-center rounded-lg text-s1-text-sub hover:bg-white hover:text-s1-text-main transition-all">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </div>
          </Link>
        </div>
      </div>

      {/* FAB - Increased bottom offset to avoid overlap with nav */}
      <div className="fixed bottom-24 right-6 z-40">
        <button className="group flex size-16 items-center justify-center rounded-2xl bg-s1-flat-pink text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all">
          <span className="material-symbols-outlined text-[32px] font-bold">add</span>
        </button>
      </div>
    </div>
  );
}
