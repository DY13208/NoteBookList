import React from 'react';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="text-s5-flat-black bg-s5-bg-cream min-h-screen selection:bg-s5-flat-yellow">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto pb-10 px-5">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <button className="flex size-12 items-center justify-center rounded-full border-[3px] border-s5-flat-black bg-white shadow-hard-btn hover:bg-gray-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h2 className="text-xl font-black tracking-wider text-s5-flat-black uppercase">个人中心</h2>
          <button className="flex size-12 items-center justify-center rounded-full border-[3px] border-s5-flat-black bg-white shadow-hard-btn hover:bg-gray-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <span className="material-symbols-outlined font-bold">settings</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bento-card bg-white p-5 mb-5 shadow-hard flex items-center gap-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-s5-flat-blue rounded-full border-[3px] border-s5-flat-black opacity-20"></div>
          <div className="relative size-24 rounded-full border-[3px] border-s5-flat-black bg-s5-flat-yellow shrink-0 overflow-hidden">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyxGDwEYRMgbv76fYq_fmdygVBwMPBnOHiCflY_E_NCiq6aw0IXUgvrnBXVm59r80TmdKzqulstVzOE0FAC_kGPasNEDKkiwH_pTICb5fQHqkeo8QWIeWui2BK7Xfeuv1Rel8eVH5lUnP6tqvUvFh45oHsiYzPF9Q0cWLBGpOUKfuziGIEVEnlNV-fNfENIzLjlE6N8TQhaoy-bTCWcJs-RW2xLaxzX4CNLs304_ryJauFkLfn84horWEiTBUsog2Uhfs1BlMydk"
            />
          </div>
          <div className="flex flex-col z-10">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-s5-flat-black leading-none">Elena Fisher</h1>
              <span
                className="material-symbols-outlined text-s5-flat-blue text-xl fill-current"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="text-sm font-bold text-gray-500 mb-2">@elena_learns</p>
            <div className="inline-flex items-center px-3 py-1 bg-s5-flat-black text-white rounded-full text-xs font-bold w-max">
              <span className="material-symbols-outlined text-[14px] mr-1 text-s5-flat-yellow">stars</span>
              等级 12
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bento-card bg-s5-flat-blue p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">12</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">课程数</span>
          </div>
          <div className="bento-card bg-s5-flat-pink p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">84%</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">完成率</span>
          </div>
          <div className="bento-card bg-s5-flat-yellow p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">45h</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">学习时长</span>
          </div>
        </div>

        {/* Mood Gallery */}
        <div className="bento-card bg-white p-5 mb-5 shadow-hard relative">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-black text-s5-flat-black leading-tight">心情画廊</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">今日状态</p>
            </div>
            <button className="text-xs font-bold border-2 border-s5-flat-black px-3 py-1 rounded-full hover:bg-s5-flat-black hover:text-white transition-colors">
              编辑
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="group cursor-pointer flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl border-[3px] border-transparent hover:border-s5-flat-black hover:bg-s5-flat-blue/20 bg-gray-50 flex items-center justify-center transition-all duration-200">
                <span className="text-4xl grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all">
                  😰
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-s5-flat-black">紧张</span>
            </div>
            <div className="group cursor-pointer flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl border-[3px] border-s5-flat-black bg-s5-flat-yellow flex items-center justify-center shadow-hard-sm relative overflow-hidden">
                <span className="text-4xl relative z-10">🐰</span>
                <div className="absolute top-1 right-1 size-3 bg-s5-flat-pink rounded-full border-2 border-s5-flat-black"></div>
              </div>
              <span className="text-[10px] font-black text-s5-flat-black bg-s5-flat-yellow px-2 py-0.5 rounded-full border border-s5-flat-black">
                活跃
              </span>
            </div>
            <div className="group cursor-pointer flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl border-[3px] border-transparent hover:border-s5-flat-black hover:bg-s5-flat-blue/20 bg-gray-50 flex items-center justify-center transition-all duration-200">
                <span className="text-4xl grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all">
                  🐱
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-s5-flat-black">好奇</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <h3 className="text-lg font-black text-s5-flat-black px-1 mb-3">设置</h3>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Link href="/trophy-room" className="bento-card col-span-2 bg-s5-flat-purple p-4 shadow-hard flex items-center justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl border-[3px] border-s5-flat-black bg-[#FFD700] flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined font-bold">emoji_events</span>
              </div>
              <div>
                <p className="font-black text-s5-flat-black leading-tight text-lg">勋章</p>
                <p className="text-xs text-s5-flat-black font-bold opacity-70">查看我的成就</p>
              </div>
            </div>
            <div className="size-10 rounded-full border-[3px] border-s5-flat-black bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
            </div>
          </Link>
          <div className="bento-card col-span-2 bg-white p-4 shadow-hard flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl border-[3px] border-s5-flat-black bg-white flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <p className="font-black text-s5-flat-black leading-tight text-lg">AI 人设</p>
                <p className="text-xs text-s5-flat-black font-bold opacity-70">苏格拉底式导师</p>
              </div>
            </div>
            <button className="size-10 rounded-full border-[3px] border-s5-flat-black bg-white hover:bg-s5-flat-black hover:text-white flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
          <div className="bento-card bg-s5-flat-green p-4 shadow-hard flex flex-col justify-between h-32">
            <div className="size-10 rounded-xl border-[3px] border-s5-flat-black bg-white flex items-center justify-center text-s5-flat-black mb-2">
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <p className="font-black text-s5-flat-black leading-tight">隐私设置</p>
              <p className="text-[10px] text-s5-flat-black font-bold opacity-70 uppercase tracking-wide mt-1">
                严格模式
              </p>
            </div>
          </div>
          <div className="bento-card bg-white p-4 shadow-hard flex flex-col justify-between h-32">
            <div className="flex justify-between items-start w-full">
              <div className="size-10 rounded-xl border-[3px] border-s5-flat-black bg-s5-flat-yellow flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <label className="flex items-center cursor-pointer relative">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-10 h-6 bg-gray-200 rounded-full border-[3px] border-s5-flat-black transition-colors peer-checked:bg-s5-flat-green"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full border-2 border-s5-flat-black transition-all peer-checked:translate-x-4 peer-checked:bg-s5-flat-black"></div>
              </label>
            </div>
            <div>
              <p className="font-black text-s5-flat-black leading-tight">提醒</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">每日开启</p>
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bento-card bg-s5-flat-black p-6 mb-8 shadow-hard relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[120px]">workspace_premium</span>
          </div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-s5-flat-yellow uppercase tracking-widest border border-s5-flat-yellow rounded-md px-2 py-0.5 inline-block mb-2">
                当前计划
              </p>
              <p className="text-2xl font-black text-white mt-1">专业学习者</p>
            </div>
            <div className="size-8 rounded-full border-2 border-white bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
          </div>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-xs font-bold text-gray-300">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">folder</span> 存储空间
              </span>
              <span className="text-white">4.2GB / 10GB</span>
            </div>
            <div className="w-full h-4 rounded-full border-2 border-white bg-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-[42%] bg-s5-flat-blue border-r-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-2 pb-24">
          <button className="w-full py-4 rounded-2xl border-[3px] border-s5-flat-black bg-white shadow-hard text-s5-flat-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <span className="material-symbols-outlined">logout</span>
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}
