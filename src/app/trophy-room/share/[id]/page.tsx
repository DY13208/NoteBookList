"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AchievementShareCard() {
  const params = useParams();
  const id = params.id as string;

  // In a real app, we'd fetch data based on id
  const achievement = {
    title: "学习大师",
    userName: "Alex Smith",
    notesCount: "100+",
    daysCount: "50",
    medalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7IiWjqR3wVg90bof1uB4TouyQv2e93TZBu8g9Pn3RxoXlRhY5DLc4vKx8CPLZsup7CCUfsTVMLFoq_lk4ie85O4hI92GGTTJ6ouuDy-5hx7_rao_RHwGgUXEffLqG9YHzjJkGHNP48GwS7SI9HRLGOJoq4nyVjAULz_0qCQFI_0E04h0nKLW12LC58sV5K37uGPxILX5bON62DGMhENhcaFhYgDswQGuQ_1s88DJnj06L6wnGe8VjA5-EYrfDCxPJCfB4PfAXVE",
    heroUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRby82YXzYrFCybLEdRioDz6wYZiUIHwgLHWrmfi7Wyi7Brna0ArJg8-dpV7cM-gU9OFfstCPUO8xOiujRruHPVhmzWvzoq2pHEzg7xGvJ0SmxIkKAJkEZ44YEN2KeQwJRF7n7icO2cdt_K-8Ip0LO8kDyoh5NekmVie215FzKCGgFxo66U-daLWVepgKtA9G5KOqqDwTBTlQG91pRus5xL-ip-GvTqFXfJcTL9_PF5o_0NFhmCBLpIm9OlNHgjMdc3DPNU6Hjx8"
  };

  return (
    <div className="bg-[#fffadd] min-h-screen flex items-center justify-center p-4 font-jakarta antialiased relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
           style={{
             backgroundColor: '#fffadd',
             backgroundImage: 'radial-gradient(#f4257b 1px, transparent 1px), radial-gradient(#f4257b 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: '0 0, 20px 20px'
           }}>
      </div>

      {/* Main Share Card Container */}
      <div className="relative w-full max-w-[400px] bg-white border-8 border-[#f4257b] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Background decoration inside card */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ffeef5] to-white z-0"></div>

        {/* Header Image Section */}
        <div className="relative z-10 w-full h-[240px] bg-white rounded-b-3xl overflow-hidden shadow-sm">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url("${achievement.heroUrl}")` }}
          ></div>
        </div>

        {/* Headline Section */}
        <div className="relative z-10 pt-6 pb-2 text-center px-4">
          <div className="inline-block bg-[#f4257b]/10 rounded-full px-4 py-1 mb-2">
            <span className="text-[#f4257b] text-xs font-bold tracking-widest uppercase">达成里程碑</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#181114] tracking-tight leading-none drop-shadow-sm">
            恭喜达成！
          </h1>
        </div>

        {/* Medal / Card Section */}
        <div className="relative z-10 p-6 flex flex-col items-center text-center">
          {/* Medal Icon */}
          <div className="w-40 h-40 mb-4 rounded-full bg-yellow-100 p-2 shadow-lg ring-4 ring-yellow-200">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-full"
              style={{ backgroundImage: `url("${achievement.medalUrl}")` }}
            ></div>
          </div>
          {/* User Info */}
          <div className="flex flex-col gap-1 w-full text-center">
            <h2 className="text-[#181114] text-2xl font-bold leading-tight">{achievement.title}</h2>
            <div className="flex items-center justify-center gap-2 text-[#8a6072]">
              <span className="material-symbols-outlined text-[20px]">person</span>
              <p className="text-base font-medium">{achievement.userName}</p>
            </div>
            <div className="mt-2 bg-green-100 text-green-700 text-xs font-bold py-1 px-3 rounded-full self-center">
              成就解锁
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 px-6 pb-6">
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col items-center gap-1 rounded-xl p-4 bg-[#fef2f2] border-2 border-[#fecaca]">
              <span className="material-symbols-outlined text-[#f4257b] text-2xl">edit_note</span>
              <p className="text-[#181114] text-xs font-bold uppercase tracking-wider text-center">笔记数</p>
              <p className="text-[#f4257b] text-2xl font-black leading-none">{achievement.notesCount}</p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 rounded-xl p-4 bg-[#fef2f2] border-2 border-[#fecaca]">
              <span className="material-symbols-outlined text-[#f4257b] text-2xl">calendar_month</span>
              <p className="text-[#181114] text-xs font-bold uppercase tracking-wider text-center">打卡天数</p>
              <p className="text-[#f4257b] text-2xl font-black leading-none">{achievement.daysCount}</p>
            </div>
          </div>
        </div>

        {/* Footer / Download Section */}
        <div className="relative z-10 bg-[#f4257b]/5 border-t-2 border-[#f4257b]/10 p-5 mt-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm p-1 border border-[#f4257b]/20">
                <div
                  className="w-full h-full bg-center bg-cover rounded"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjxJlC02PZYMaOQJzeNxlg9VKBlEfHldhykdWwaXdsLFfjZtiFwEit4NsEWs_oM4f9nZHN5d-xKu2cMDBNxd8XsIStJJOl57rLQIBDBvSHreiGzeVljB_8dl2lC0U_c1O1np0u4EO-vwdjrOR9-1RgjBLqy_XlBEyhL0mEUg3Y4Xra1j5nhs-dWwwQ7I5cVswwZzM-xoOXYkiG5OvI3BeNsLEU8hqjfmVoxK5nBnzHjelI1Jdzh4tQhcZEtg5VoA59twS-y47tkms")' }}
                ></div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-gray-900 leading-tight">Chiikawa Learn</span>
                <span className="text-xs text-gray-500">扫码加入！</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white p-1 rounded-lg border border-gray-200">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAShpE2gUFIHM3dqbAIrTACwjMPEiETTQ1dXuPdTgw179ZOP8PeqVXHG4DLfCkaUski4CUN6AkfpZZeAji8Aw1WxgevO_51X8YMbSo-uO5E6gEN1bQTz25oKxgdxXo4xxG0gf-r9oL2auzZfOVkA4i1gWmLVA8hklhtf6VPlwXUxOP7sMD7WMAUx_v1Y-YeQ6eKsitH-TTm-IEIoY0srqB4LiZKtgx0SLFFTGWSaXhBpcsR4cxzDdYQhE5hgcoP0jDCF-IPOZ41hLI")' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Close button for overlay */}
      <Link href="/trophy-room" className="fixed top-6 right-6 z-[20] size-12 bg-white border-4 border-[#181114] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#181114] hover:bg-gray-100 transition-colors">
        <span className="material-symbols-outlined text-[#181114] font-bold">close</span>
      </Link>
    </div>
  );
}
