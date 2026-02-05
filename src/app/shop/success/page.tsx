"use client";

import React from 'react';
import Link from 'next/link';

export default function RedemptionSuccess() {
  return (
    <div className="bg-[#f8f5f7] dark:bg-[#221017] min-h-screen font-jakarta selection:bg-[#f4257b] selection:text-white">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        {/* Top App Bar */}
        <div className="flex items-center p-4 pb-2 justify-between bg-transparent z-10">
          <Link href="/shop" className="text-[#181114] dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </Link>
          <h2 className="text-[#181114] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">兑换结果</h2>
          <div className="flex w-12 items-center justify-end">
            <Link href="/shop" className="text-[#f4257b] text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:opacity-80">完成</Link>
          </div>
        </div>

        {/* Main Content Scrollable Area */}
        <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-24 px-6 overflow-y-auto">
          {/* Speech Bubble Header */}
          <div className="relative mb-8 w-full max-w-xs animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="relative bg-white border-4 border-[#181114] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#181114]
              after:content-[''] after:absolute after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2 after:border-t-[20px] after:border-t-[#181114] after:border-x-[20px] after:border-x-transparent
              before:content-[''] before:absolute before:bottom-[-14px] before:left-1/2 before:-translate-x-1/2 before:border-t-[17px] before:border-t-white before:border-x-[17px] before:border-x-transparent before:z-[1]">
              <h1 className="text-[#181114] tracking-tight text-[32px] font-extrabold leading-tight text-center uppercase">呀哈！</h1>
            </div>
          </div>

          {/* Illustration Area */}
          <div className="w-full max-w-sm aspect-square mb-8 relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full border-2 border-black opacity-80 z-0"></div>
            <div className="absolute top-1/2 -left-6 w-8 h-8 bg-blue-400 rotate-45 border-2 border-black opacity-80 z-0"></div>
            <div className="absolute -bottom-2 right-10 w-6 h-6 bg-[#f4257b] rounded-full border-2 border-black opacity-80 z-0"></div>
            {/* Main Character Image */}
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat z-10 relative"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqj_CeYV9jkPcOWPyx_NxyvHRx1fnxh9t68lIt-a6WxNudwA3TYO1enMis4yWxarEUUMREM-jb14qDEGFErlxPxGMLn0R9ay9fpx7Z9pofUIsXqJri18NgnpWVbW58cgSnLiKXmm7iJOcwIODN9PrKdcoc4JOIsFV1CtGxHLrc_bLQzTR1Hcd68dbemGiktcglQs-3f6k53W9yD_BaKziCy4758Qf3Gdr6V12ULd50r9nqQMhOBRxC8NpmHdpAAiAe_qJ6hM0fW-4")' }}
            >
            </div>
          </div>

          {/* Success Card */}
          <div className="w-full max-w-md">
            <div className="flex flex-col items-stretch justify-start rounded-2xl border-4 border-[#181114] bg-white dark:bg-[#2a1d23] overflow-hidden shadow-[6px_6px_0px_0px_rgba(244,37,123,1)]">
              <div className="flex flex-col p-5 gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div
                    className="size-16 shrink-0 rounded-xl border-2 border-[#181114] overflow-hidden bg-[#f8f5f7]"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3PV-e_mLVueBdDFYIF8DDqSaEnm2Z2ZxFM9Qnyoemj2I1u-_9tMHtAGuYVL1MkOYVY_-r1O5u_8RUKG6g8b2K451w2fxmPap2oRCAugdMeKRU7VEIBPNhfsk37XkIGK6XrxF2w-olvOtbX3ciCTb3MIERKWNCkigvsm2zFCGgongIXL1o0qAwlPV7MeklLWYhdiwzTnH8O9u8t7zjmOeYXj4osrmMiqmpkfkQXPzIPyXVickiu-Z_jQbsbeOJAZ4B5e8QSZUxvrA")', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#181114] dark:text-white text-xl font-extrabold leading-tight tracking-[-0.015em]">兑换成功！</p>
                    <p className="text-[#8a6072] dark:text-gray-300 text-base font-medium leading-normal">新主题已解锁！</p>
                  </div>
                  <div className="ml-auto flex items-center justify-center size-10 rounded-full bg-green-100 border-2 border-green-500 text-green-600">
                    <span className="material-symbols-outlined font-bold">check</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#f4257b]/10 dark:bg-[#f4257b]/20 p-3 border-t-2 border-[#181114] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#181114] dark:text-white px-2">奖励</span>
                <span className="text-xs font-bold text-[#f4257b] px-2">标准皮肤包</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-[#f8f5f7] dark:bg-[#221017] bg-opacity-95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-center w-full max-w-md mx-auto">
            <Link href="/shop" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-[#f4257b] hover:bg-[#f4257b]/90 text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-none border-b-4 border-[#c01d60] active:border-b-0 active:translate-y-1 transition-all">
              <span className="truncate">太棒了！</span>
            </Link>
          </div>
          {/* Spacer for safe area on mobile */}
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}
