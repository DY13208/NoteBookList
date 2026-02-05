"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AchievementShareCard() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Determine theme based on ID
  const isStarry = id === 'starry';
  const isForest = id === 'forest';

  if (isStarry) {
    return (
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-starry-bg font-jakarta text-white pb-24">
        {/* Top App Bar */}
        <div className="flex items-center bg-starry-bg p-4 pb-2 justify-between sticky top-0 z-50">
          <button
            onClick={() => router.back()}
            className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>arrow_back</span>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">分享成就</h2>
          <div className="flex w-12 items-center justify-end">
            <button
              onClick={() => router.push('/trophy-room')}
              className="text-white/80 hover:text-white text-base font-bold leading-normal tracking-[0.015em] shrink-0 transition-colors"
            >
              完成
            </button>
          </div>
        </div>

        {/* Main Content Area: The Shareable Card */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* The Card Container */}
          <div className="w-full max-w-sm bg-gradient-to-b from-starry-bg to-starry-gradient-end rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative">
            {/* Background Decorations */}
            <div className="absolute top-10 left-10 text-starry-accent/20">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>star</span>
            </div>
            <div className="absolute top-20 right-12 text-starry-accent/30">
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>star</span>
            </div>
            <div className="absolute bottom-32 left-8 text-starry-accent/20">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>auto_awesome</span>
            </div>
            <div className="absolute top-1/4 right-4 text-white/5">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>nights_stay</span>
            </div>

            {/* Card Content */}
            <div className="flex flex-col items-center pt-10 pb-8 px-6 relative z-10">
              {/* Headline */}
              <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-center mb-2 drop-shadow-lg">星空学者！</h1>
              {/* Body Text */}
              <p className="text-blue-100/80 text-base font-medium leading-relaxed text-center max-w-[260px]">
                你在星空下完成了今晚的学习目标。
              </p>

              {/* Main Illustration */}
              <div className="relative w-full aspect-square mt-6 mb-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat rounded-[1.5rem]"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-VzOs9NIgcradafEzIdH4q6w1iLA6w1NLzcjfM8sDIcJHsToJyDyfhK00FEWVURvz2FLh7AS3DB3GUMD-kIuJ7VwvSvdSRxZTVjOvfKTmvSEw-jGJ1FdDAnHXaKPn0aHQ3jAMgJSkkEB4ThA9Txv2ZBAN5Pi4IofsKBv2iEYE6Gh7yB9bRgXXnk6iTUEQtnN9h3YLUdEIj4Jcv9pS58i_3sO83HBqrYRIsph6wCp8upmxYKIwIb9qOgkSUNiuulyXqplIngifbIA")' }}
                >
                </div>
              </div>

              {/* Achievement Badge Details */}
              <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 mt-2">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg border-2 border-white/20">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>bedtime</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-white text-lg font-bold leading-tight truncate">夜猫子勋章</p>
                    <p className="text-blue-200/60 text-sm font-medium mt-1">获得于 2023年10月24日</p>
                  </div>
                  <div className="bg-starry-accent text-starry-bg text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    新
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                  <p className="text-blue-200/50 text-xs font-bold uppercase tracking-wider mb-1">连续</p>
                  <p className="text-white text-xl font-bold">7 天</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                  <p className="text-blue-200/50 text-xs font-bold uppercase tracking-wider mb-1">时间</p>
                  <p className="text-white text-xl font-bold">23:30</p>
                </div>
              </div>
            </div>

            {/* Footer Branding inside card */}
            <div className="bg-black/20 p-4 flex justify-center items-center gap-2 border-t border-white/5">
              <div className="size-6 bg-white rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0f49bd] text-[16px]">school</span>
              </div>
              <span className="text-white/60 text-sm font-semibold">Chiikawa Learn</span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex gap-4 mt-8 w-full max-w-sm justify-center">
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/5">
                <span className="material-symbols-outlined text-white">ios_share</span>
              </div>
              <span className="text-white/60 text-xs font-medium">分享</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/5">
                <span className="material-symbols-outlined text-white">download</span>
              </div>
              <span className="text-white/60 text-xs font-medium">保存</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/5">
                <span className="material-symbols-outlined text-white">content_copy</span>
              </div>
              <span className="text-white/60 text-xs font-medium">复制</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isForest) {
    return (
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark text-text-main dark:text-white font-jakarta pb-24">
        {/* Top App Bar */}
        <div className="flex items-center bg-transparent p-4 pb-2 justify-between z-10">
          <button
            onClick={() => router.back()}
            className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">分享成就</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center">
          <div className="w-full text-center mb-6">
            <h2 className="text-text-main dark:text-white tracking-tight text-[24px] font-bold leading-tight">展示你的进步！</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">与朋友分享你的新森林探险家勋章。</p>
          </div>

          {/* The Share Card */}
          <div className="w-full relative overflow-hidden rounded-2xl shadow-xl aspect-[9/16] flex flex-col bg-leafy-green">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-forest-pattern) 2px, transparent 2px), radial-gradient(var(--color-forest-pattern) 2px, transparent 2px)', backgroundSize: '32px 32px', backgroundPosition: '0 0, 16px 16px' }}>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-forest-accent-1 rounded-full opacity-60"></div>
            <div className="absolute top-20 -left-10 w-24 h-24 bg-forest-accent-2 rounded-full opacity-40"></div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-forest-pattern">
                  <span className="material-symbols-outlined text-[20px]">eco</span>
                </div>
                <span className="text-white/90 font-bold text-sm tracking-widest uppercase opacity-80">吉伊学习</span>
              </div>

              <div className="text-center mb-2">
                <h1 className="text-[#064e3b] text-3xl font-extrabold leading-none tracking-tight drop-shadow-sm uppercase">森林探险家</h1>
                <div className="h-1 w-16 bg-white/50 mx-auto mt-2 rounded-full"></div>
              </div>

              <div className="flex-1 flex items-center justify-center py-2 relative">
                <div className="absolute w-48 h-48 bg-white/30 rounded-full blur-2xl"></div>
                <div
                  className="w-full aspect-square bg-contain bg-center bg-no-repeat z-10 transition-transform duration-500 hover:scale-105"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhg1GSS1Q31fXcIYVSJm3ggpzDkJaPKYZN2-J4SbbKooS0tlFjAcKoK2QhyTOhpw6hCmCN8M5yVkcQYcqzktjl0efERStVieP9uExvY2FiGS3_Ay1nLoetGoIpqrhi_XD_8xXpgO7bOpbIer8TCtoDTazSwF6j1gM4cEAilXhKLxHMsTh0FZWC_IAeWWxpkrZOXZNI0fyq_W9ytKCV9QnaiFtZSbs7NI0ZN7RtlsTzZa5cie423f6-6mbfZPYLlunM6F3VesHJJe8")' }}
                >
                </div>
                <div className="absolute -bottom-4 right-0 bg-white p-1 rounded-full shadow-lg rotate-12">
                  <div className="h-16 w-16 rounded-full bg-starry-accent border-4 border-[#FDB813] flex items-center justify-center relative overflow-hidden">
                    <span className="material-symbols-outlined text-[#B45309] text-[32px]">military_tech</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/40"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-white/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#dcfce7] p-2 rounded-lg text-forest-pattern">
                    <span className="material-symbols-outlined">hiking</span>
                  </div>
                  <div>
                    <p className="text-[#166534] text-xs font-bold uppercase tracking-wider">成就</p>
                    <p className="text-[#14532d] text-base font-bold leading-tight">掌握自然词汇</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#166534]/10">
                  <div className="text-center">
                    <p className="text-[#166534] text-xs font-medium">已学单词</p>
                    <p className="text-[#14532d] text-lg font-extrabold">50</p>
                  </div>
                  <div className="text-center border-l border-[#166534]/10">
                    <p className="text-[#166534] text-xs font-medium">连续</p>
                    <p className="text-[#14532d] text-lg font-extrabold">12 天</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-[#064e3b] text-xs font-medium mt-4 opacity-75">
                完成于 10月24日
              </p>
            </div>
          </div>

          <div className="mt-8 px-4 text-center">
            <p className="text-text-main dark:text-gray-200 text-base font-normal leading-normal">
              做得好！你和团队一起征服了森林。继续加油！
            </p>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#102210] border-t border-gray-100 dark:border-white/5 p-4 pb-8 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto flex gap-3">
            <button className="flex-1 bg-gray-100 dark:bg-white/10 text-text-main dark:text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">download</span>
              保存
            </button>
            <button className="flex-[2] bg-signup-primary text-[#052e05] h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:brightness-105 active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined">ios_share</span>
              分享到动态
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to original design if ID doesn't match
  return (
    <div className="bg-[#fffadd] min-h-screen flex items-center justify-center p-4 font-jakarta antialiased relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
           style={{
             backgroundColor: '#fffadd',
             backgroundImage: 'radial-gradient(#f4257b 1px, transparent 1px), radial-gradient(#f4257b 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: '0 0, 20px 20px'
           }}>
      </div>

      <div className="relative w-full max-w-[400px] bg-white border-8 border-[#f4257b] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ffeef5] to-white z-0"></div>
        <div className="relative z-10 w-full h-[240px] bg-white rounded-b-3xl overflow-hidden shadow-sm">
          <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIRby82YXzYrFCybLEdRioDz6wYZiUIHwgLHWrmfi7Wyi7Brna0ArJg8-dpV7cM-gU9OFfstCPUO8xOiujRruHPVhmzWvzoq2pHEzg7xGvJ0SmxIkKAJkEZ44YEN2KeQwJRF7n7icO2cdt_K-8Ip0LO8kDyoh5NekmVie215FzKCGgFxo66U-daLWVepgKtA9G5KOqqDwTBTlQG91pRus5xL-ip-GvTqFXfJcTL9_PF5o_0NFhmCBLpIm9OlNHgjMdc3DPNU6Hjx8")' }}></div>
        </div>
        <div className="relative z-10 pt-6 pb-2 text-center px-4">
          <div className="inline-block bg-[#f4257b]/10 rounded-full px-4 py-1 mb-2">
            <span className="text-[#f4257b] text-xs font-bold tracking-widest uppercase">达成里程碑</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#181114] tracking-tight leading-none drop-shadow-sm">恭喜达成！</h1>
        </div>
        <div className="relative z-10 p-6 flex flex-col items-center text-center">
          <div className="w-40 h-40 mb-4 rounded-full bg-yellow-100 p-2 shadow-lg ring-4 ring-yellow-200">
            <div className="w-full h-full bg-center bg-contain bg-no-repeat rounded-full" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAz7IiWjqR3wVg90bof1uB4TouyQv2e93TZBu8g9Pn3RxoXlRhY5DLc4vKx8CPLZsup7CCUfsTVMLFoq_lk4ie85O4hI92GGTTJ6ouuDy-5hx7_rao_RHwGgUXEffLqG9YHzjJkGHNP48GwS7SI9HRLGOJoq4nyVjAULz_0qCQFI_0E04h0nKLW12LC58sV5K37uGPxILX5bON62DGMhENhcaFhYgDswQGuQ_1s88DJnj06L6wnGe8VjA5-EYrfDCxPJCfB4PfAXVE")' }}></div>
          </div>
          <h2 className="text-[#181114] text-2xl font-bold leading-tight">学习大师</h2>
        </div>
        <div className="relative z-10 bg-[#f4257b]/5 border-t-2 border-[#f4257b]/10 p-5 mt-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm p-1 border border-[#f4257b]/20">
                <div className="w-full h-full bg-center bg-cover rounded" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjxJlC02PZYMaOQJzeNxlg9VKBlEfHldhykdWwaXdsLFfjZtiFwEit4NsEWs_oM4f9nZHN5d-xKu2cMDBNxd8XsIStJJOl57rLQIBDBvSHreiGzeVljB_8dl2lC0U_c1O1np0u4EO-vwdjrOR9-1RgjBLqy_XlBEyhL0mEUg3Y4Xra1j5nhs-dWwwQ7I5cVswwZzM-xoOXYkiG5OvI3BeNsLEU8hqjfmVoxK5nBnzHjelI1Jdzh4tQhcZEtg5VoA59twS-y47tkms")' }}></div>
              </div>
              <span className="text-sm font-bold text-gray-900 leading-tight">Chiikawa Learn</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => router.back()} className="fixed top-6 right-6 z-[20] size-12 bg-white border-4 border-[#181114] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#181114] hover:bg-gray-100 transition-colors">
        <span className="material-symbols-outlined text-[#181114] font-bold">close</span>
      </button>
    </div>
  );
}
