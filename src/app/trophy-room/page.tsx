"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TrophyRoom() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const achievements = [
    {
      id: 'note-master',
      title: 'Note Master',
      desc: 'Create 50 notes',
      rarity: 'Rare',
      rarityColor: 'text-yellow-500',
      icon: 'workspace_premium',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw0DY9UuljiiAlOM80P86m1FaoIsbcAJyBrh3ieFiaogBoz7bZB0oBa0cVbEd6D78gmky_DDQgUJTqNWgEjQLFuezghBQfbqHVuuGxGXbfYnMs2GJE0q8CBPDV52vuUU7V9mga4fehwSGRRMnTADITzNeNnkoxKjE1R7q3XWIcUXHYVLWEdsapafbkyFO5_6iJd1zOus61pWZn8dAAOdP_AlfsSmNq-fIcsC-8zc4XZTXdCtvfzDEA4uzSkp2DEIXak6Qgz78vzBo',
      unlocked: true,
      bg: 'bg-[#FFF5F9]',
      date: '2023.10.27',
      fullDesc: "You've written 100 high-quality notes! YAH! Keep up the great work!",
      rarityBadge: "Legendary",
      rarityBg: "bg-[#FFD700]"
    },
    {
      id: 'project-finisher',
      title: 'Project Finisher',
      desc: 'Complete 10 projects',
      rarity: 'Epic',
      rarityColor: 'text-blue-500',
      icon: 'trophy',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQ7gw9f1xyt5EiuJ3cAqxViP0Ae5WRa2UC8pxDBFlsOsOeACFf-D8Y2-zLedMuDLX7smE9W6JkDkQN3AefG24ySFiRRtjQqaiWRW1nEaVyHBWU15y2UMmq2e4V31NFBFr-zsxjmwIq5xAJpAoVl0XFejFGCZoacGv5QWU0UhdZ5fDHfw_dD6j2EN98A8zGsabSMgyoybHNWWRSlUd2J3irhI8yLe0pLXwvHBpwV4IsPUub7JRro4n7JeU8Tuy6mzuBbMOv0xQxbc',
      unlocked: true,
      bg: 'bg-[#F0F9FF]'
    },
    {
      id: 'daily-streaker',
      title: 'Daily Streaker',
      desc: '30 Day Login Streak!',
      rarity: 'Legendary',
      rarityColor: 'text-[#f4257b]',
      icon: 'local_fire_department',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMyIkLYuZtgxkjJCO9LGcAOu4_DVWdMx2VDdKpqbXnKLpg_I1K4KVtx_SPkxSyIqM0_6k7qV9ONljTmXrV_gvj5uTDmX0lvzwnBAbZu40M0grdCPzmhm_YcMOt4HwVoaH0cgNCvmknObn8a1iScEOyQYqlAivs14RVEx_YqY1rjkXBG9ogAwPV5kGRh6VblKuN3CjOZi5JrLb5XSECn67cRc-HcX9J3TBZfAXTY29ZQ2oz1njkW_4eR_3DJG6Nv4p3NWBeBoDqi7M',
      unlocked: true,
      isWide: true,
      bg: 'bg-white dark:bg-white/10'
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      desc: 'Locked',
      unlocked: false,
      progress: 40,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMWzMMrJMYaYWEuMhHY_coY3fCndz2xY3gTwtpnb2DBhNk4UGF4ZCfuEyXw4pltxGYd98bIwGkl-h9zyj_yY7_LdJJHHo1mevASoUzSF6G37E-nGfZXhUbHkE3-YWyHkDXv0zzJfHt1yqnjnO-dXUiRTNrCUXonLuaPh-BRxzL5k8L3W0Ky0_j0w2agb6FaZ-n9oiuMC-nzuuy3n0uCaK0M8-jH_NN_nQWGZCnOKMc0KWyi8WSk18vgnybzJZISlBHGNz1may4FaY'
    },
    {
      id: 'quiz-whiz',
      title: 'Quiz Whiz',
      desc: 'Locked',
      unlocked: false,
      progress: 10,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVziD0yOzOVgS_apdV56D6ge1LzAhWfD9JQEzHUNFQlaOB4U1_fzzWNb6mOtWt5X22SGPxabZprebtDCJ5zQFQ3x8hhhB1JbFz2GZT_uQ5RUy4HShRToH9GTS1ZHzLPoO8AyceF4LX7H5AS6ayXnbiC6CWrVKuv_nWP2rMl6GpnuZAZzKoZGWvZd1TDc5bGUjkuVFkk3H8JH_n1xNweMmM-OB5lqCEK5Z_Swtrd4pPFBd1Vd6XvtsdjLK7C1g4S1oZ4UbtOcvgdaQ'
    }
  ];

  return (
    <div className="bg-[#f8f5f7] dark:bg-[#221017] font-jakarta text-[#181114] dark:text-white antialiased min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="flex items-center bg-[#f8f5f7] dark:bg-[#221017] p-4 sticky top-0 z-50">
        <Link href="/profile" className="flex size-12 shrink-0 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Trophy Room</h2>
        <div className="flex size-12 items-center justify-center">
          <button className="flex size-12 cursor-pointer items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </div>
      </header>

      {/* HeadlineText */}
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#f4257b]">Achievements</h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Collect them all to become a master!</p>
      </div>

      {/* ProgressBar (Bento Style) */}
      <div className="px-6 pb-6">
        <div className="bg-white dark:bg-[#2f1b25] border-2 border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-base font-bold leading-normal">Total Completion</p>
              <p className="text-[#f4257b] text-xs font-bold mt-1 uppercase tracking-wider">Level 5 Scholar</p>
            </div>
            <p className="text-right text-2xl font-black text-[#f4257b]">75%</p>
          </div>
          <div className="relative h-4 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[#f4257b] rounded-full" style={{ width: '75%' }}></div>
            <div className="absolute top-0 left-0 h-full w-full opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)' }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-gray-400 text-xs font-bold">15/20 Unlocked</p>
            <p className="text-gray-400 text-xs font-bold">5 Remaining</p>
          </div>
        </div>
      </div>

      {/* ImageGrid (Bento Grid) */}
      <div className="grid grid-cols-2 gap-4 px-6 pb-6">
        {achievements.map((item) => (
          <div
            key={item.id}
            onClick={() => item.unlocked && setSelectedAchievement(item)}
            className={`${item.isWide ? 'col-span-2' : ''} group relative flex flex-col gap-3 ${item.unlocked ? (item.isWide ? 'bg-[#f4257b]/10 dark:bg-[#f4257b]/20 border-[#f4257b]/20' : 'bg-white dark:bg-[#2f1b25] border-gray-100 dark:border-gray-800') : 'bg-gray-50 dark:bg-white/5 border-dashed border-gray-200 dark:border-gray-700 opacity-80 cursor-not-allowed'} border-2 p-4 rounded-2xl hover:border-[#f4257b] transition-colors cursor-pointer`}
          >
            <div className={`flex ${item.isWide ? 'flex-row items-center gap-4 h-full' : 'flex-col gap-3'}`}>
              <div className={`${item.isWide ? 'w-20 h-20' : 'w-full aspect-square'} rounded-xl ${item.bg || 'bg-gray-100 dark:bg-black/20'} flex items-center justify-center overflow-hidden relative shrink-0`}>
                <div
                  className={`absolute inset-0 bg-center bg-contain bg-no-repeat scale-75 ${item.unlocked ? '' : 'opacity-30 grayscale'}`}
                  style={{ backgroundImage: `url("${item.imageUrl}")` }}
                ></div>
                {!item.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-black/50 backdrop-blur-[2px]">
                    <span className="material-symbols-outlined text-[32px] text-gray-400">lock</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                {item.unlocked ? (
                  <>
                    <div className="flex items-center gap-1 mb-1">
                      <span className={`material-symbols-outlined text-[16px] ${item.rarityColor} font-variation-settings-'FILL'1`}>
                        {item.icon === 'workspace_premium' ? 'workspace_premium' : item.icon === 'trophy' ? 'trophy' : 'local_fire_department'}
                      </span>
                      <p className={`text-xs font-bold ${item.rarityColor} uppercase tracking-wider`}>{item.rarity}</p>
                    </div>
                    <p className={`${item.isWide ? 'text-lg' : 'text-base'} font-bold leading-tight`}>{item.title}</p>
                    <p className={`${item.isWide ? 'text-[#f4257b]/70' : 'text-gray-400'} text-xs font-medium mt-1`}>{item.desc}</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Locked</p>
                    </div>
                    <p className="text-base font-bold leading-tight text-gray-400">{item.title}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <p className="text-gray-400 text-[10px] font-bold mt-1 text-right">{item.progress}%</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#2d1b22] rounded-xl border-[3px] border-[#221017] dark:border-white/20 shadow-[4px_4px_0px_0px_#221017] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col animate-pop-up-bounce">
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-white dark:bg-[#2d1b22] px-5 py-4 border-b-[3px] border-[#f8f5f7] dark:border-white/10">
              <h2 className="text-[#221017] dark:text-white text-lg font-bold uppercase tracking-tight">Achievement Unlocked</h2>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="group flex size-10 shrink-0 items-center justify-center bg-[#f8f5f7] dark:bg-white/10 rounded-lg border-2 border-[#221017] dark:border-white/20 hover:bg-[#f4257b] hover:border-[#f4257b] transition-colors"
              >
                <span className="material-symbols-outlined text-[#221017] dark:text-white group-hover:text-white text-xl">close</span>
              </button>
            </div>
            <div className="flex flex-col items-center p-6 text-center">
              {/* Medal Illustration Section */}
              <div className="relative mb-6 group cursor-pointer">
                <div className="absolute inset-0 bg-[#f4257b]/20 dark:bg-[#f4257b]/40 rounded-full scale-110 transform group-hover:scale-125 transition-transform duration-300"></div>
                <div className="relative w-40 h-40 rounded-full border-[3px] border-[#221017] bg-[#FFF0F5] flex items-center justify-center overflow-hidden z-10 shadow-[2px_2px_0px_0px_#221017]">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${selectedAchievement.imageUrl}")` }}></div>
                </div>
                <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">
                  <span className="material-symbols-outlined text-3xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
              </div>

              {/* Headline Text */}
              <h1 className="text-[#221017] dark:text-white text-[32px] font-extrabold leading-tight mb-1 tracking-tight">{selectedAchievement.title}</h1>
              {/* Meta Text */}
              <p className="text-[#8a6072] dark:text-[#dcbccc] text-sm font-bold uppercase tracking-wide mb-5">Obtained on: {selectedAchievement.date || '2023.10.27'}</p>

              {/* Chip: Rarity Tag */}
              <div className="flex justify-center mb-6">
                <div className={`flex items-center gap-x-2 px-5 py-2 rounded-lg ${selectedAchievement.rarityBg || 'bg-[#FFD700]'} border-2 border-[#221017] shadow-[2px_2px_0px_0px_#221017] transform -rotate-2 hover:rotate-0 transition-transform duration-200`}>
                  <span className="material-symbols-outlined text-[#221017] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  <p className="text-[#221017] text-sm font-extrabold uppercase tracking-wider">Rarity: {selectedAchievement.rarityBadge || selectedAchievement.rarity}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#221017]/90 dark:text-white/90 text-lg font-medium leading-relaxed mb-8 px-2">
                {selectedAchievement.fullDesc || selectedAchievement.desc} <br/> <span className="text-[#f4257b] font-bold">YAH!</span> Keep up the great work!
              </p>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-4">
                <Link
                  href={`/trophy-room/share/${selectedAchievement.id}`}
                  className="w-full h-14 bg-[#f4257b] text-white font-bold text-lg rounded-xl border-2 border-[#221017] shadow-[4px_4px_0px_0px_#221017] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span className="material-symbols-outlined group-hover/btn:animate-bounce">ios_share</span>
                  Share with Friends
                </Link>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="w-full h-14 bg-white dark:bg-white/5 text-[#221017] dark:text-white font-bold text-lg rounded-xl border-2 border-[#221017] dark:border-white/20 shadow-[4px_4px_0px_0px_#221017] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
