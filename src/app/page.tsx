
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type DashboardUser = {
  id: string;
  name: string;
  avatar_url?: string | null;
};

type WeeklyInsight = {
  progress_percent: number;
  title: string;
  description: string;
};

type FocusTask = {
  id: string;
  title: string;
  status?: string;
  due_at?: string | null;
};

type RecentNote = {
  id: string;
  title: string;
  updated_at?: string | null;
};

type Dashboard = {
  greeting: string;
  user: DashboardUser;
  weekly_insight: WeeklyInsight;
  today_focus: FocusTask[];
  recent_notes: RecentNote[];
};

const focusStyles = [
  {
    border: "hover:border-s1-flat-blue",
    badge: "bg-s1-flat-blue",
    icon: "schedule",
    accent: "text-s1-flat-blue",
  },
  {
    border: "hover:border-s1-flat-pink",
    badge: "bg-s1-flat-pink",
    icon: "warning",
    accent: "text-s1-flat-pink",
  },
  {
    border: "hover:border-s1-flat-mint",
    badge: "bg-s1-flat-mint",
    icon: "check_circle",
    accent: "text-s1-flat-mint",
  },
];

export default function Workbench() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await apiFetch<Dashboard>("/dashboard");
        if (!mounted) return;
        setDashboard(data);
      } catch {
        if (!mounted) return;
        setDashboard(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const greeting = dashboard?.greeting || "Good morning";
  const userName = dashboard?.user?.name || "Alex";
  const avatarUrl = dashboard?.user?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAqCC2A2_Con2asXLsbO3dHLYPOmvtXiK-DENlbmK-w9BZLH_wvgqRRkQHxVV_FWw4159YEH3YQvQ2DtiRT5a_hnQgODbXmWSx118BT2CtJ0gDh70k33SyniXEFp4wfHHK1_aiK0tXtptwJspws-U_689W219nDKfk6nPoGTHqfHQyW225sao3z2WY4MlVftKZ64iDgfozliG6FeioSKVtubiqBt9u52rIxkn-lsZet4mySsYPNmtwRQHLf294fjBPUc1esghlQnNQ";
  const weekly = dashboard?.weekly_insight;
  const focusTasks = dashboard?.today_focus || [];
  const recentNotes = dashboard?.recent_notes || [];

  return (
    <div className="font-nunito antialiased min-h-screen pb-32 bg-s1-bg-base text-s1-text-main selection:bg-s1-flat-pink selection:text-white">
      <div className="sticky top-0 z-50 bg-white border-b-2 border-s1-surface px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="size-12 rounded-xl overflow-hidden border-2 border-s1-surface bg-s1-surface relative z-10">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${avatarUrl}")` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest text-s1-text-sub uppercase font-rounded">
                Chiikawa OS
              </span>
              <h2 className="font-rounded text-lg font-black text-s1-text-main leading-none">
                {userName}&apos;s Space
              </h2>
            </div>
          </div>
          <button className="relative size-11 flex items-center justify-center rounded-xl bg-s1-surface text-s1-text-main hover:bg-s1-flat-yellow hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-4 right-4 size-2 rounded-full bg-s1-flat-pink border border-white"></span>
          </button>
        </div>
      </div>

      <div className="px-6 pt-8 pb-2">
        <h1 className="font-rounded text-s1-text-main text-[2.5rem] font-black leading-tight">
          {greeting},<br />
          <span className="text-s1-flat-blue">{userName}!</span>
        </h1>
      </div>

      <div className="px-6 mt-6 mb-8 relative">
        <div className="bg-s1-flat-yellow rounded-3xl p-6 relative overflow-visible">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-5 translate-y-5"></div>
          <div className="relative z-10 flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20">
              <span className="material-symbols-outlined text-white text-[18px]">auto_awesome</span>
              <span className="text-xs font-black font-rounded text-white uppercase tracking-wide">
                {weekly?.title || "每周洞察"}
              </span>
            </div>
            <div className="absolute -top-12 -right-2 z-20 animate-float">
              <div className="relative flex flex-col items-center">
                <div className="bg-white px-3 py-1 rounded-lg border-2 border-s1-text-main mb-1">
                  <span className="text-xs font-black text-s1-text-main">YAH!!</span>
                </div>
                <div className="text-[72px] leading-none filter drop-shadow-none grayscale-0">📊</div>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-4 pr-16">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-s1-text-main font-rounded">
                {weekly?.progress_percent ?? 0}
              </span>
              <span className="text-2xl font-black text-s1-text-main">%</span>
            </div>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-4 border-2 border-transparent">
              <div
                className="bg-s1-text-main h-full rounded-full"
                style={{ width: `${weekly?.progress_percent ?? 0}%` }}
              ></div>
            </div>
            <p className="text-sm text-s1-text-main font-bold leading-relaxed mb-6 font-rounded opacity-90 pr-4">
              {weekly?.description || "保持连续学习！"}
            </p>
            <div className="flex gap-3">
              <Link
                href="/points"
                className="flex-1 rounded-xl bg-white py-3 text-sm font-black text-s1-text-main border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 hover:bg-gray-50 transition-all text-center"
              >
                查看报告
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-s1-surface rounded-xl flex items-center justify-center text-2xl">🎯</div>
            <div>
              <h3 className="font-rounded text-s1-text-main text-xl font-black leading-none">今日焦点</h3>
              <span className="text-xs font-bold text-s1-text-sub">Chiikawa 正在学习...</span>
            </div>
          </div>
          <Link
            href="/projects"
            className="text-xs font-black text-s1-flat-blue uppercase bg-s1-flat-blue/10 px-3 py-1.5 rounded-lg hover:bg-s1-flat-blue hover:text-white transition-colors"
          >
            查看全部
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {loading && (
            <div className="rounded-2xl bg-s1-surface p-4 text-sm font-bold text-s1-text-sub">加载中...</div>
          )}
          {!loading && focusTasks.length === 0 && (
            <div className="rounded-2xl bg-s1-surface p-4 text-sm font-bold text-s1-text-sub">暂无任务</div>
          )}
          {focusTasks.map((task, idx) => {
            const style = focusStyles[idx % focusStyles.length];
            return (
              <label
                key={task.id}
                className={`group relative bg-s1-surface rounded-2xl p-4 cursor-pointer border-2 border-transparent ${style.border} transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative pt-1">
                    <input className="checkbox-flat" type="checkbox" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <p className="text-s1-text-main text-lg font-black leading-tight font-rounded">
                        {task.title}
                      </p>
                      <span className={`text-[10px] font-black text-white ${style.badge} px-2 py-1 rounded`}>
                        {task.status || "FOCUS"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`material-symbols-outlined ${style.accent} text-[16px] fill-current`}>
                        {style.icon}
                      </span>
                      <span className={`text-xs ${style.accent} font-extrabold`}>
                        {task.due_at ? `截止 ${new Date(task.due_at).toLocaleDateString()}` : "无截止日期"}
                      </span>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6">
        <h3 className="font-rounded text-s1-text-main text-lg font-black mb-4">快速记录</h3>
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/notes"
            className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-blue rounded-2xl py-5 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">document_scanner</span>
            <span className="text-xs font-black text-white uppercase">扫描</span>
          </Link>
          <Link
            href="/prompts"
            className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-pink rounded-2xl py-5 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">mic</span>
            <span className="text-xs font-black text-white uppercase">语音</span>
          </Link>
          <Link
            href="/notes"
            className="group relative flex flex-col items-center justify-center gap-2 bg-s1-flat-mint rounded-2xl py-5 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-white text-[28px]">edit_note</span>
            <span className="text-xs font-black text-white uppercase">笔记</span>
          </Link>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-s1-surface rounded-xl flex items-center justify-center text-2xl">📝</div>
            <div>
              <h3 className="font-rounded text-s1-text-main text-xl font-black leading-none">最近笔记</h3>
              <span className="text-xs font-bold text-s1-text-sub">Hachiware 在微笑！</span>
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
          {recentNotes.length === 0 && !loading && (
            <div className="rounded-2xl bg-s1-surface p-4 text-sm font-bold text-s1-text-sub">暂无笔记</div>
          )}
          {recentNotes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="group flex items-center gap-4 bg-s1-surface rounded-2xl p-3 pr-4 cursor-pointer hover:bg-gray-100 transition-colors"
            >
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
                <h4 className="font-rounded text-md font-black text-s1-text-main line-clamp-1">{note.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-black text-white bg-s1-flat-blue uppercase">Note</span>
                  <span className="text-xs text-s1-text-sub font-bold">
                    {note.updated_at ? new Date(note.updated_at).toLocaleDateString() : "未知"}
                  </span>
                </div>
              </div>
              <button className="size-8 flex items-center justify-center rounded-lg text-s1-text-sub hover:bg-white hover:text-s1-text-main transition-all">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed bottom-nav-safe-lg right-6 z-40">
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="group flex size-16 items-center justify-center rounded-2xl bg-s1-flat-pink text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">add</span>
        </button>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close create menu"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setIsCreateOpen(false)}
          ></button>
          <div className="absolute left-1/2 w-[min(92vw,420px)] -translate-x-1/2 bottom-[calc(var(--bottom-nav-space)+1rem)]">
            <div className="rounded-3xl border-2 border-black/10 bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-s1-text-sub">Create</p>
                  <h3 className="text-xl font-black text-s1-text-main">创建新内容</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="size-9 rounded-full border-2 border-s1-text-main/20 flex items-center justify-center text-s1-text-main hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="grid gap-3">
                <Link
                  href="/notes/new"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex items-center gap-4 rounded-2xl border-2 border-s1-text-main/10 bg-s1-flat-mint/10 px-4 py-4 hover:border-s1-flat-mint hover:bg-s1-flat-mint/20 transition-all"
                >
                  <div className="size-12 rounded-2xl bg-s1-flat-mint text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">menu_book</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-s1-text-main">新建笔记</p>
                    <p className="text-xs font-bold text-s1-text-sub">记录想法</p>
                  </div>
                  <span className="material-symbols-outlined text-s1-text-sub">chevron_right</span>
                </Link>
                <Link
                  href="/items/new"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex items-center gap-4 rounded-2xl border-2 border-s1-text-main/10 bg-s1-flat-yellow/20 px-4 py-4 hover:border-s1-flat-yellow hover:bg-s1-flat-yellow/30 transition-all"
                >
                  <div className="size-12 rounded-2xl bg-s1-flat-yellow text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">local_mall</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-s1-text-main">新建项目</p>
                    <p className="text-xs font-bold text-s1-text-sub">管理任务</p>
                  </div>
                  <span className="material-symbols-outlined text-s1-text-sub">chevron_right</span>
                </Link>
                <Link
                  href="/projects/new"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex items-center gap-4 rounded-2xl border-2 border-s1-text-main/10 bg-s1-flat-blue/10 px-4 py-4 hover:border-s1-flat-blue hover:bg-s1-flat-blue/20 transition-all"
                >
                  <div className="size-12 rounded-2xl bg-s1-flat-blue text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">dashboard_customize</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-s1-text-main">新建任务</p>
                    <p className="text-xs font-bold text-s1-text-sub">追踪进度</p>
                  </div>
                  <span className="material-symbols-outlined text-s1-text-sub">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
