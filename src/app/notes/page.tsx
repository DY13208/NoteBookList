"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [isAiExpanded, setIsAiExpanded] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-s1-text-main dark:text-white font-jakarta overflow-x-hidden antialiased selection:bg-s1-flat-mint selection:text-black min-h-screen pb-24">
      <div className="max-w-md mx-auto border-x border-gray-100 dark:border-gray-800">
        {/* Top App Bar */}
        <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-4 px-4 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10 border-2 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
            </button>
            <h2 className="text-xl font-extrabold tracking-tight flex-1 text-center">笔记</h2>
            <div className="flex w-10 items-center justify-end">
              <button className="flex size-10 items-center justify-center rounded-full bg-s1-flat-mint text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
          {/* Filter Chips */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-black dark:border-white bg-s3-accent text-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
              <span className="text-sm font-bold">按日期</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">按标签</span>
            </button>
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">AI 建议</span>
              <span className="material-symbols-outlined text-s1-flat-mint text-[18px]">auto_awesome</span>
            </button>
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">收藏</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 p-4">
          {/* Folders Section */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-2xl font-extrabold tracking-tight">文件夹</h3>
              <button className="text-sm font-bold text-gray-500 hover:text-s1-flat-mint">查看全部</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
              {/* Folder Card 1 */}
              <Link href="/notes" className="snap-start shrink-0 w-40 h-48 bg-s3-flat-blue rounded-2xl border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-3xl text-black">folder_open</span>
                  <div className="bg-white/50 rounded-full px-2 py-0.5 text-xs font-bold text-black border border-black/10">12</div>
                </div>
                <div>
                  <p className="text-black font-extrabold text-lg leading-tight group-hover:underline decoration-2 underline-offset-2">学习笔记</p>
                  <p className="text-black/70 text-xs font-semibold mt-1">2小时前更新</p>
                </div>
              </Link>
              {/* Folder Card 2 */}
              <Link href="/notes" className="snap-start shrink-0 w-40 h-48 bg-s4-chiikawa-pink rounded-2xl border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-3xl text-black">design_services</span>
                  <div className="bg-white/50 rounded-full px-2 py-0.5 text-xs font-bold text-black border border-black/10">5</div>
                </div>
                <div>
                  <p className="text-black font-extrabold text-lg leading-tight group-hover:underline decoration-2 underline-offset-2">项目 A</p>
                  <p className="text-black/70 text-xs font-semibold mt-1">昨天更新</p>
                </div>
              </Link>
              {/* Folder Card 3 */}
              <Link href="/notes" className="snap-start shrink-0 w-40 h-48 bg-s1-flat-mint rounded-2xl border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-3xl text-black">menu_book</span>
                  <div className="bg-white/50 rounded-full px-2 py-0.5 text-xs font-bold text-black border border-black/10">8</div>
                </div>
                <div>
                  <p className="text-black font-extrabold text-lg leading-tight group-hover:underline decoration-2 underline-offset-2">阅读列表</p>
                  <p className="text-black/70 text-xs font-semibold mt-1">3天前更新</p>
                </div>
              </Link>
              {/* Add Folder Card */}
              <div className="snap-start shrink-0 w-40 h-48 bg-white dark:bg-white/5 rounded-2xl border-[3px] border-dashed border-gray-300 dark:border-gray-600 p-4 flex flex-col items-center justify-center cursor-pointer hover:border-s1-flat-mint hover:bg-s1-flat-mint/5 transition-all">
                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-500 mb-2">create_new_folder</span>
                <p className="text-gray-400 dark:text-gray-500 font-bold text-sm">新建文件夹</p>
              </div>
            </div>
          </section>

          {/* Notes List Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-2xl font-extrabold tracking-tight">最近笔记</h3>
              <div className="flex gap-2">
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined text-gray-500">grid_view</span>
                </button>
                <button className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                  <span className="material-symbols-outlined">view_list</span>
                </button>
              </div>
            </div>

            {/* Note Card 1 */}
            <Link href="/notes/neural-networks" className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border-2 border-gray-100 dark:border-gray-800 p-4 hover:border-s1-flat-mint/50 transition-all cursor-pointer">
              <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border-2 border-black relative">
                <div className="absolute inset-0 bg-s1-flat-mint/20 z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANlwsalDQl1LpL3XHkRBpjFdJJ1K9bpgW7TUjepNWhN-9v0aPxYPSJDv6rHPB5-a9xMcUU1is4qQONqzDTUxPn2krOsBNgqSqb3k3kInXdHvJ5z4jqvpVfrv9ih9bXm4g-OchdM3-5FJJiYGAs2clk1c5YAfTVar2kuLGDZ-ZpWIrlot-9g19OlAMPj2BV5m9yr8pBjr1fMV_tsfrMfaHNhCTieURTdqdqwrpLMX8fqVKXq26K7EnnL9XTSfoscwUWFxwwaqf7k5U")' }}
                ></div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">科学</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-s1-flat-mint">bookmark</span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight text-gray-900 dark:text-white mb-1">生物学导论</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">细胞结构、DNA复制过程和基本遗传原理的概述...</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 10:30 AM
                  </span>
                  <span className="text-xs font-bold text-s1-flat-mint flex items-center gap-1 ml-auto">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI 摘要已就绪
                  </span>
                </div>
              </div>
            </Link>

            {/* Note Card 2 */}
            <Link href="/notes/neural-networks" className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border-2 border-gray-100 dark:border-gray-800 p-4 hover:border-s1-flat-mint/50 transition-all cursor-pointer">
              <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border-2 border-black relative">
                <div className="absolute inset-0 bg-s4-chiikawa-pink/20 z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAID6Uca9ZpAkD44-lhkxBbd7OL9QYNU9ouFcUcjBP2KuhmoOsagAlGNHpvPjzpUwmHbLERKiqUYzif_0YFr6tdwsdftZldWHJvSte4T4WW6PlYppNwwqnIGrRfn4uQ82fEAFHirZViLetx0QdSS7knDWWKFbCiwWRyKfXtFx8Kq1gHrm75Ba7PRlgzVmKMdtLs1VNDbCOMGL9y4NXKhYubmuq4F-SWEJhi_u3Q-K1grkAnrVT0FAkFOBRc3a7M_D0Drg1kFnnT0zI")' }}
                ></div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">设计</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-s1-flat-mint">bookmark_border</span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight text-gray-900 dark:text-white mb-1">UI 组件库灵感</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">用于新移动应用设计的扁平化UI组件、调色板 and 排版规则的集合。</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 24
                  </span>
                </div>
              </div>
            </Link>

            {/* Note Card 3 */}
            <Link href="/notes/neural-networks" className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border-2 border-gray-100 dark:border-gray-800 p-4 hover:border-s1-flat-mint/50 transition-all cursor-pointer">
              <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border-2 border-black relative">
                <div className="w-full h-full bg-s3-accent flex items-center justify-center text-black">
                  <span className="material-symbols-outlined text-4xl">mic</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">会议</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-s1-flat-mint">bookmark_border</span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight text-gray-900 dark:text-white mb-1">每周同步音频</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">每周团队同步的录音。在15分钟左右讨论了行动项。</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 22
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1 ml-auto">
                    <span className="material-symbols-outlined text-[14px]">graphic_eq</span> 45m
                  </span>
                </div>
              </div>
            </Link>

            {/* Note Card 4 */}
            <Link href="/notes/neural-networks" className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border-2 border-gray-100 dark:border-gray-800 p-4 hover:border-s1-flat-mint/50 transition-all cursor-pointer">
              <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border-2 border-black relative">
                <div className="absolute inset-0 bg-blue-100/20 z-10"></div>
                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined text-4xl">description</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">历史</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-s1-flat-mint">bookmark_border</span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight text-gray-900 dark:text-white mb-1">文艺复兴概论</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">关于14世纪到17世纪欧洲文化、艺术、政治和经济“重生”的详细笔记。</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 20
                  </span>
                </div>
              </div>
            </Link>
          </section>
        </main>

        {/* Floating AI Actions */}
        <div className="fixed bottom-32 right-6 z-[110] flex flex-col items-end gap-3">
          {/* Expanded Actions */}
          <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isAiExpanded ? 'scale-100 opacity-100 mb-2' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}>
            <button className="flex items-center gap-2 bg-s3-accent text-black font-bold px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>AI 摘要</span>
            </button>
            <button className="flex items-center gap-2 bg-s4-chiikawa-pink text-black font-bold px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
              <span className="material-symbols-outlined">edit_note</span>
              <span>新建笔记</span>
            </button>
          </div>

          {/* Main Toggle Button (Hachiware) */}
          <button
            onClick={() => setIsAiExpanded(!isAiExpanded)}
            className="w-24 h-24 relative group active:scale-95 transition-transform"
          >
            <div className={`absolute -top-2 right-12 bg-white border-2 border-black px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-opacity ${isAiExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-xs font-bold text-black whitespace-nowrap">需要帮助？✨</p>
            </div>
            <div className="w-full h-full bg-white dark:bg-gray-200 border-[3px] border-black rounded-full overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <img
                alt="Cute flat illustration of Hachiware cat holding a folder"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcw4VZKTbRArMhvd7foS1DnZYK33ZqkICZdWKbGdNiY919X7Qjpmur5cyXF2ptZ_ixQPnp6Qp4GZdDvEqVjAAVbhxG9QYg7hIPMim5mm0pj6JwrSPdUd7cmBtwQf9fHaZj5kgk9fwvW4-PrcAv4LHODDYhw2Hv689r4LRHj4-lcIfEnl4EXRnZyxc5Q70rgFeLPJc47lQMIlZTkIy2HKpc-Qwu4rXmhRhg0j_K3NkIIAHGVzDVpfsfNVvUbDUdANxqOqFHd1q9bX8"
              />
            </div>
            {/* Close icon when expanded */}
            {isAiExpanded && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-pop-up-bounce">
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
