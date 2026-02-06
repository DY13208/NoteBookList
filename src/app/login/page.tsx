"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-gradient-to-b from-login-bg via-[#fff6d1] to-white dark:bg-background-dark font-jakarta">
      <div className="absolute inset-0 bg-stars pointer-events-none"></div>

      <div className="relative flex items-center p-4 pb-2 justify-between z-10">
        <button
          onClick={() => router.back()}
          className="text-login-text-dark flex size-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-login-text-dark cursor-pointer active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0px_#2d3436] transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="size-12"></div>
      </div>

      <div className="relative z-10 px-4 py-2 flex justify-center">
        <div
          className="w-full max-w-[320px] aspect-square bg-center bg-no-repeat bg-contain flex flex-col justify-end overflow-hidden"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVaB81pdCDtIjfu2LT-k6CTY7pqsAD5IsZ-k-qBkvG5r2JKgxabx6Y96-Y2yrm2ungDoDGF2mQsBQp564jktjxmegw01rt4-WX5S2ehaKjCBY0h_mwEoEc8xIh-tlxVdO4NHLp4yU_bdoIHURcjIweKyYafzoaL8USBIkTJwhHOkTyOlECmdYqAU2Uah0Z7XtSevdkPh9imkJyWzyHEe2BSmwMjN0zQBAfQBC8lAw364VKrBa2OrMKWjy8GvFkI_XFvauhbtTm2WU")',
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-login-text-dark tracking-tight text-[36px] font-extrabold leading-tight px-4 text-center pb-2 pt-2 drop-shadow-sm">
          你好！
        </h1>
        <p className="text-login-text-dark/70 text-base font-medium text-center px-4 pb-6">
          准备好今天学习新知识了吗？
        </p>
      </div>

      <div className="relative z-10 flex flex-col flex-1 px-4 pb-8">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-[720px] mx-auto rounded-3xl border-2 border-login-text-dark/10 bg-white/90 p-6 shadow-[0_18px_40px_rgba(45,52,54,0.18)] backdrop-blur"
        >
          <div className="absolute -top-4 left-6 rounded-full bg-login-primary px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[2px_2px_0px_#2d3436]">
            欢迎回来
          </div>
          <div className="flex flex-col gap-1 pb-4">
            <label className="text-login-text-dark text-base font-bold leading-normal ml-1">
              邮箱/手机号
            </label>
            <input
              className="flat-input flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-white h-16 placeholder:text-login-text-dark/40 px-5 text-lg font-medium leading-normal outline-none text-login-text-dark focus:border-login-primary"
              placeholder="请输入您的邮箱或手机号"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 pb-6">
            <label className="text-login-text-dark text-base font-bold leading-normal ml-1">密码</label>
            <div className="flex w-full flex-1 items-stretch flat-input bg-white overflow-hidden">
              <input
                className="flex w-full min-w-0 flex-1 resize-none bg-transparent h-16 placeholder:text-login-text-dark/40 px-5 text-lg font-medium leading-normal outline-none text-login-text-dark border-none focus:ring-0"
                placeholder="请输入您的密码"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-login-text-dark/60 flex items-center justify-center pr-4 cursor-pointer hover:text-login-text-dark">
                <span className="material-symbols-outlined">visibility_off</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <a className="text-login-primary font-bold text-sm hover:underline decoration-2" href="#">
                忘记密码？
              </a>
            </div>
          </div>

          {error && (
            <div className="mt-2 rounded-xl bg-red-50 text-red-600 text-sm font-bold px-4 py-2 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flat-btn-login flex w-full items-center justify-center bg-login-primary h-16 rounded-2xl text-white text-lg font-bold tracking-wide mt-4 hover:brightness-105 active:brightness-95 transition-all disabled:opacity-60"
          >
            {loading ? "登录中..." : "登录"}
          </button>

          <div className="flex justify-center items-center pt-5 gap-2">
            <span className="text-login-text-dark font-medium">还没有账号？</span>
            <Link className="text-login-accent font-extrabold hover:underline decoration-2" href="/signup">
              立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
