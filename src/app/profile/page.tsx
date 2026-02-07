
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  name: string;
  username: string;
  avatar_url?: string | null;
  level: number;
  points?: number;
};

type Stats = {
  courses_count: number;
  completion_rate: number;
  study_hours: number;
};

type Plan = {
  plan_name: string;
  storage_used_gb: number;
  storage_limit_gb: number;
  user_level: number;
};

type Settings = {
  notifications?: boolean;
  privacy_mode?: boolean;
  ai_persona?: string;
};

type Mood = {
  id: string;
  mood: string;
  createdAt: string;
};

const moodOptions = [
  { label: "开心", emoji: "😊" },
  { label: "平静", emoji: "😌" },
  { label: "专注", emoji: "🎯" },
];

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({ courses_count: 0, completion_rate: 0, study_hours: 0 });
  const [plan, setPlan] = useState<Plan>({ plan_name: "免费会员", storage_used_gb: 0, storage_limit_gb: 10, user_level: 1 });
  const [settings, setSettings] = useState<Settings>({ notifications: true, privacy_mode: false, ai_persona: "默认角色" });
  const [moods, setMoods] = useState<Mood[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [userData, statsData, planData, settingsData, moodData] = await Promise.all([
          apiFetch<User>("/users/me"),
          apiFetch<Stats>("/users/me/stats"),
          apiFetch<Plan>("/users/me/plan"),
          apiFetch<Settings>("/users/me/settings"),
          apiFetch<Mood[]>("/users/me/moods"),
        ]);
        if (!mounted) return;
        setUser(userData);
        setStats(statsData);
        setPlan(planData);
        setSettings({
          notifications: settingsData.notifications ?? true,
          privacy_mode: settingsData.privacy_mode ?? false,
          ai_persona: settingsData.ai_persona ?? "默认角色",
        });
        setMoods(moodData || []);
      } catch (err) {
        if (!mounted) return;
        setStatus(err instanceof Error ? err.message : "加载失败");
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const currentMood = moods[0]?.mood;

  const handleMood = async (label: string) => {
    setStatus("");
    try {
      const mood = await apiFetch<Mood>("/users/me/moods", {
        method: "POST",
        body: JSON.stringify({ mood: label }),
      });
      setMoods((prev) => [mood, ...prev]);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "操作失败");
    }
  };

  const handleToggleNotifications = async () => {
    const next = !(settings.notifications ?? true);
    setSettings((prev) => ({ ...prev, notifications: next }));
    try {
      await apiFetch<Settings>("/users/me/settings", {
        method: "PATCH",
        body: JSON.stringify({ notifications: next }),
      });
    } catch (err) {
      setSettings((prev) => ({ ...prev, notifications: !next }));
      setStatus(err instanceof Error ? err.message : "操作失败");
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "操作失败");
    }
  };

  return (
    <div className="text-s5-flat-black bg-s5-bg-cream min-h-screen selection:bg-s5-flat-yellow">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto pb-10 px-5">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex size-12 items-center justify-center rounded-full border-[3px] border-s5-flat-black bg-white shadow-hard-btn hover:bg-gray-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </Link>
          <h2 className="text-xl font-black tracking-wider text-s5-flat-black uppercase">我的</h2>
          <button className="flex size-12 items-center justify-center rounded-full border-[3px] border-s5-flat-black bg-white shadow-hard-btn hover:bg-gray-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <span className="material-symbols-outlined font-bold">settings</span>
          </button>
        </div>

        {status && (
          <div className="mb-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold px-4 py-2 border border-rose-200">
            {status}
          </div>
        )}

        <div className="bento-card bg-white p-5 mb-5 shadow-hard flex items-center gap-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-s5-flat-blue rounded-full border-[3px] border-s5-flat-black opacity-20"></div>
          <div className="relative size-24 rounded-full border-[3px] border-s5-flat-black bg-s5-flat-yellow shrink-0 overflow-hidden">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src={
                user?.avatar_url ||
                "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20avatar%20with%20friendly%20smile%20on%20yellow%20background&image_size=square_hd"
              }
            />
          </div>
          <div className="flex flex-col z-10">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-s5-flat-black leading-none">{user?.name || "这个用户很神秘"}</h1>
              {user && (
                <span
                  className="material-symbols-outlined text-s5-flat-blue text-xl fill-current"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-gray-500 mb-2">@{user?.username || "guest"}</p>
            <div className="inline-flex items-center px-3 py-1 bg-s5-flat-black text-white rounded-full text-xs font-bold w-max">
              <span className="material-symbols-outlined text-[14px] mr-1 text-s5-flat-yellow">stars</span>
              等级 {user?.level ?? 1}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bento-card bg-s5-flat-blue p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">{stats.courses_count}</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">课程数</span>
          </div>
          <div className="bento-card bg-s5-flat-pink p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">{stats.completion_rate}%</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">完成率</span>
          </div>
          <div className="bento-card bg-s5-flat-yellow p-3 flex flex-col items-center justify-center shadow-hard min-h-[100px]">
            <span className="text-3xl font-black text-s5-flat-black mb-1">{stats.study_hours}h</span>
            <span className="text-[10px] font-black uppercase text-s5-flat-black/70 tracking-widest">学习时长</span>
          </div>
        </div>

        <div className="bento-card bg-white p-5 mb-5 shadow-hard flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">会员计划</p>
            <h3 className="text-lg font-black text-s5-flat-black leading-tight mt-1">{plan.plan_name}</h3>
            <p className="text-xs font-bold text-gray-400 mt-1">{plan.storage_used_gb}GB / {plan.storage_limit_gb}GB</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/points"
              className="px-4 py-2 rounded-full border-2 border-s5-flat-black text-xs font-black uppercase tracking-wide hover:bg-s5-flat-black hover:text-white transition-colors text-center"
            >
              我的积分
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 rounded-full border-2 border-s5-flat-black bg-s5-flat-yellow text-xs font-black uppercase tracking-wide hover:brightness-105 transition-colors text-center"
            >
              积分商城
            </Link>
          </div>
        </div>

        <div className="bento-card bg-white p-5 mb-5 shadow-hard relative">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-black text-s5-flat-black leading-tight">今日心情</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">记录心情</p>
            </div>
            <button className="text-xs font-bold border-2 border-s5-flat-black px-3 py-1 rounded-full hover:bg-s5-flat-black hover:text-white transition-colors">
              更换
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {moodOptions.map((mood) => {
              const active = currentMood === mood.label;
              return (
                <button
                  key={mood.label}
                  type="button"
                  onClick={() => handleMood(mood.label)}
                  className="group cursor-pointer flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-full aspect-square rounded-2xl border-[3px] ${
                      active ? "border-s5-flat-black bg-s5-flat-yellow" : "border-transparent bg-gray-50"
                    } flex items-center justify-center transition-all duration-200 hover:border-s5-flat-black hover:bg-s5-flat-blue/20`}
                  >
                    <span className="text-4xl">{mood.emoji}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      active ? "text-s5-flat-black" : "text-gray-400 group-hover:text-s5-flat-black"
                    }`}
                  >
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <h3 className="text-lg font-black text-s5-flat-black px-1 mb-3">服务</h3>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Link href="/trophy-room" className="bento-card col-span-2 bg-s5-flat-purple p-4 shadow-hard flex items-center justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl border-[3px] border-s5-flat-black bg-[#FFD700] flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined font-bold">emoji_events</span>
              </div>
              <div>
                <p className="font-black text-s5-flat-black leading-tight text-lg">成就墙</p>
                <p className="text-xs text-s5-flat-black font-bold opacity-70">我的成就</p>
              </div>
            </div>
            <div className="size-10 rounded-full border-[3px] border-s5-flat-black bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
            </div>
          </Link>
          <Link href="/ai" className="bento-card col-span-2 bg-s5-flat-blue p-4 shadow-hard flex items-center justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl border-[3px] border-s5-flat-black bg-white flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined font-bold">hub</span>
              </div>
              <div>
                <p className="font-black text-s5-flat-black leading-tight text-lg">AI 助手</p>
                <p className="text-xs text-s5-flat-black font-bold opacity-70">AI 密钥设置</p>
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
                <p className="font-black text-s5-flat-black leading-tight text-lg">AI 角色</p>
                <p className="text-xs text-s5-flat-black font-bold opacity-70">{settings.ai_persona || "默认角色"}</p>
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
              <p className="font-black text-s5-flat-black leading-tight">隐私模式</p>
              <p className="text-[10px] text-s5-flat-black font-bold opacity-70 uppercase tracking-wide mt-1">
                {settings.privacy_mode ? "已开启" : "已关闭"}
              </p>
            </div>
          </div>
          <div className="bento-card bg-white p-4 shadow-hard flex flex-col justify-between h-32">
            <div className="flex justify-between items-start w-full">
              <div className="size-10 rounded-xl border-[3px] border-s5-flat-black bg-s5-flat-yellow flex items-center justify-center text-s5-flat-black">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <label className="flex items-center cursor-pointer relative">
                <input
                  checked={settings.notifications ?? true}
                  onChange={handleToggleNotifications}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full border-[3px] border-s5-flat-black transition-colors peer-checked:bg-s5-flat-green"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full border-2 border-s5-flat-black transition-all peer-checked:translate-x-4 peer-checked:bg-s5-flat-black"></div>
              </label>
            </div>
            <div>
              <p className="font-black text-s5-flat-black leading-tight">通知</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">推送通知</p>
            </div>
          </div>
        </div>

        <div className="bento-card bg-s5-flat-black p-6 mb-8 shadow-hard relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[120px]">workspace_premium</span>
          </div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-s5-flat-yellow uppercase tracking-widest border border-s5-flat-yellow rounded-md px-2 py-0.5 inline-block mb-2">
                会员计划
              </p>
              <p className="text-2xl font-black text-white mt-1">{plan.plan_name}</p>
            </div>
            <div className="size-8 rounded-full border-2 border-white bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
          </div>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-xs font-bold text-gray-300">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">folder</span> 存储空间
              </span>
              <span className="text-white">{plan.storage_used_gb}GB / {plan.storage_limit_gb}GB</span>
            </div>
            <div className="w-full h-4 rounded-full border-2 border-white bg-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-s5-flat-blue border-r-2 border-white" style={{ width: `${Math.min(100, (plan.storage_used_gb / plan.storage_limit_gb) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        <div className="px-2 pb-24">
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl border-[3px] border-s5-flat-black bg-white shadow-hard text-s5-flat-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span className="material-symbols-outlined">logout</span>
            登出
          </button>
        </div>
      </div>
    </div>
  );
}
