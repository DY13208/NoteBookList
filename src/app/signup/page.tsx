"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-signup-bg dark:bg-background-dark font-jakarta text-text-main dark:text-white transition-colors duration-200">
      {/* TopAppBar */}
      <div className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-signup-bg dark:bg-background-dark bg-opacity-95 backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="text-text-main dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full p-2 transition-colors flex shrink-0 items-center justify-center"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">注册</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col">
        {/* HeaderImage */}
        <div className="px-4 py-2">
          <div
            className="w-full aspect-[4/3] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 relative"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk37g98-x6vElDZbPlg0GhOi481nIFG9CfObeGzkA3y7mPwAnXwVarC8pZPMpldlHiNqLmAMdjCMuxnHaj6GiAdYnCxA9hUIs3GWHfR-T44pMwQIKEI1wd_lTlOxNVMwS6MH8YzWo1EVXz4uPl78Ai-L4Pe_f24s4sr3NMLP26Jp_LeXnDkMAUpVd7yUqopfIog9xPd7VFX7cJNX6FmxK9eGzCKNPqQRH8xUi_GYcG72mIzSLwomY2-A-YHYGi2LqQXjAiIUHOzQg")'
            }}
          >
          </div>
        </div>

        {/* HeadlineText */}
        <h1 className="text-text-main dark:text-white tracking-tight text-[32px] font-extrabold leading-tight px-6 text-center pt-4 pb-2">
          加入<span className="text-signup-primary">冒险！</span>
        </h1>
        <p className="text-signup-text-muted dark:text-gray-400 text-center px-6 pb-6 text-sm font-medium">创建您的账户，开始与AI伙伴一起学习。</p>

        {/* Form Fields */}
        <form className="flex flex-col px-4 gap-4 pb-8" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-main dark:text-white text-sm font-bold ml-1">用户名</label>
            <input
              className="w-full h-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white placeholder:text-signup-text-muted/60 dark:placeholder:text-gray-500 px-4 text-base font-medium focus:outline-none focus:border-signup-primary dark:focus:border-signup-primary focus:ring-0 transition-colors"
              placeholder="请输入您的用户名"
              type="text"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-main dark:text-white text-sm font-bold ml-1">邮箱</label>
            <input
              className="w-full h-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white placeholder:text-signup-text-muted/60 dark:placeholder:text-gray-500 px-4 text-base font-medium focus:outline-none focus:border-signup-primary dark:focus:border-signup-primary focus:ring-0 transition-colors"
              placeholder="请输入您的邮箱"
              type="email"
            />
          </div>

          {/* Create Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-main dark:text-white text-sm font-bold ml-1">创建密码</label>
            <div className="relative">
              <input
                className="w-full h-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white placeholder:text-signup-text-muted/60 dark:placeholder:text-gray-500 px-4 text-base font-medium focus:outline-none focus:border-signup-primary dark:focus:border-signup-primary focus:ring-0 transition-colors"
                placeholder="创建一个强密码"
                type="password"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-signup-text-muted dark:text-gray-500 hover:text-text-main dark:hover:text-white" type="button">
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-2 px-1">
            <div className="relative flex items-center">
              <input
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-white/10 transition-all checked:border-signup-primary checked:bg-signup-primary custom-checkbox"
                id="terms"
                type="checkbox"
              />
              <span className="material-symbols-outlined absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-text-main inset-0 m-auto" style={{ fontSize: '18px' }}>check</span>
            </div>
            <label className="text-sm font-medium text-signup-text-muted dark:text-gray-400 leading-snug cursor-pointer select-none" htmlFor="terms">
              我同意 <a className="text-text-main dark:text-white font-bold underline decoration-2 decoration-signup-primary/50 underline-offset-2 hover:decoration-signup-primary" href="#">服务条款</a> 和 <a className="text-text-main dark:text-white font-bold underline decoration-2 decoration-signup-primary/50 underline-offset-2 hover:decoration-signup-primary" href="#">隐私政策</a>。
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => router.push('/')}
            className="mt-4 w-full h-14 rounded-xl bg-signup-primary hover:bg-signup-primary/90 text-text-main font-extrabold text-lg tracking-wide transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
            type="submit"
          >
            <span>加入冒险</span>
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </form>

        {/* Footer */}
        <div className="pb-8 pt-2 text-center">
          <p className="text-signup-text-muted dark:text-gray-400 text-sm font-medium">
            已有账号？
            <Link className="text-text-main dark:text-white font-bold hover:text-signup-primary transition-colors ml-1" href="/login">立即登录</Link>
          </p>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}
