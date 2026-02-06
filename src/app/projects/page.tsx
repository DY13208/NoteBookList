"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Project = {
  id: string;
  title: string;
  description?: string | null;
  status?: string;
  progress?: number;
  dueAt?: string | null;
};

type Task = {
  id: string;
  title: string;
  status?: string;
  dueAt?: string | null;
};

type Resource = {
  id: string;
  title: string;
  url: string;
  type?: string | null;
};

function isUrgent(task?: Task | null) {
  if (!task?.dueAt) return false;
  const due = new Date(task.dueAt);
  const diff = due.getTime() - Date.now();
  return diff > 0 && diff <= 1000 * 60 * 60 * 24;
}

export default function ProjectBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [aiSteps, setAiSteps] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await apiFetch<{ items: Project[] }>("/projects?page_size=20");
        if (!mounted) return;
        setProjects(data.items || []);
        setActive(data.items?.[0] || null);
      } catch {
        if (!mounted) return;
        setProjects([]);
        setActive(null);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadDetails = async () => {
      if (!active?.id) return;
      try {
        const [taskData, resourceData] = await Promise.all([
          apiFetch<Task[]>(`/projects/${active.id}/tasks`),
          apiFetch<Resource[]>(`/projects/${active.id}/resources`),
        ]);
        if (!mounted) return;
        setTasks(taskData || []);
        setResources(resourceData || []);
      } catch {
        if (!mounted) return;
        setTasks([]);
        setResources([]);
      }
    };
    loadDetails();
    return () => {
      mounted = false;
    };
  }, [active]);

  const progress = useMemo(() => {
    if (typeof active?.progress === "number") return active.progress;
    if (!tasks.length) return 0;
    const done = tasks.filter((task) => task.status === "done").length;
    return Math.round((done / tasks.length) * 100);
  }, [active, tasks]);

  const doneTask = tasks.find((task) => task.status === "done") || null;
  const urgentTask = tasks.find((task) => task.status !== "done" && isUrgent(task)) || null;
  const normalTask = tasks.find((task) => task.status !== "done" && task.id !== urgentTask?.id) || null;

  const handleAiBreakdown = async () => {
    if (!active?.id) return;
    setLoadingAi(true);
    setAiSteps("");
    try {
      const data = await apiFetch<{ steps: string }>(`/projects/${active.id}/ai-breakdown`, {
        method: "POST",
      });
      setAiSteps(data.steps || "暂无返回");
    } catch (err) {
      setAiSteps(err instanceof Error ? err.message : "AI 请求失败");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="font-nunito bg-s6-page-bg text-s6-text-main min-h-screen selection:bg-s6-mint selection:text-white overflow-x-hidden antialiased">
      <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-s6-page-bg overflow-hidden border-x-2 border-s6-border-dark">
        <div className="flex items-center px-6 pt-12 pb-6 justify-between sticky top-0 z-50 bg-s6-page-bg/95 backdrop-blur-sm border-b-2 border-s6-border-dark">
          <Link href="/" className="bold-btn w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">arrow_back</span>
          </Link>
          <h2 className="text-xl font-black tracking-tight text-s6-text-main uppercase">Project Board</h2>
          <button className="bold-btn w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">more_horiz</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6 pb-48 pt-6">
          <div className="bg-white rounded-2xl p-6 relative overflow-hidden group border-2 border-s6-border-dark shadow-bold">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-white bg-s6-primary rounded border-2 border-s6-border-dark shadow-bold-sm">
                  {active?.status || "Active"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-s6-coral-light border-2 border-s6-border-dark flex items-center justify-center text-s6-coral shadow-bold-sm">
                <span className="material-symbols-outlined font-bold">favorite</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <h1 className="text-3xl font-black text-s6-text-main tracking-tight">{active?.title || "暂无项目"}</h1>
              <p className="text-sm text-s6-text-muted font-bold leading-relaxed border-l-4 border-s6-primary pl-3">
                {active?.description || "创建一个项目开始你的计划"}
              </p>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 border-2 border-s6-border-dark relative h-40 w-full overflow-hidden flex items-center justify-center shadow-inner">
              <img
                alt="Project cover"
                className="w-full h-full object-cover opacity-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTifztoXnNHWx0syjXp6Y1qQqgcX9MPiBy3_Yr0ecTQq31lHJHo20dIgCVF0PyTqILtqkorwgPHFALb_WZAqdrwHPdfROGplQ7tSMs-Qe1qiXZyDYdzCB0fXSDUNo2_IlRzUcrOaVb0qb03o0cD7V1xv9kL1OSsC9QfaZfBSB9pFs_gsiPZ1IazQZH2XzHhjlsNq-f7fK6-AZM7urykjBulOvNiWTPIc7nDQGiwh7qkzPjVi2bBHLQqIe0WbMp7lnSqr0Dv6cnis8"
              />
              <div className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded border-2 border-s6-border-dark shadow-bold-sm">
                <span className="text-xs font-black text-s6-text-main uppercase">Chiikawa &amp; Co.</span>
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <div className="flex justify-between text-xs font-black text-s6-text-main uppercase mb-2">
                <span>Progress</span>
                <span className="text-s6-primary bg-indigo-50 px-2 rounded border border-indigo-100">{progress}%</span>
              </div>
              <div className="border-2 border-s6-border-dark rounded-full bg-white h-4 w-full overflow-hidden relative">
                <div className="h-full w-[45%] bg-s6-primary border-r-2 border-s6-border-dark" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAiBreakdown}
            className="w-full bg-white border-2 border-s6-border-dark rounded-2xl p-1 flex items-center justify-between group active:translate-y-1 active:shadow-bold-active transition-all shadow-bold"
          >
            <div className="flex items-center gap-4 w-full p-3 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-s6-primary border-2 border-s6-border-dark flex items-center justify-center text-white shrink-0 shadow-sm">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-black text-s6-text-main">AI Breakdown</span>
                <span className="text-xs text-s6-text-muted font-bold">Auto-generate next steps</span>
              </div>
              <div className="ml-auto text-s6-text-main group-hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </div>
            </div>
          </button>
          {aiSteps && (
            <div className="rounded-2xl bg-white border-2 border-s6-border-dark p-4 text-xs font-semibold text-s6-text-main whitespace-pre-wrap shadow-bold-sm">
              {loadingAi ? "生成中..." : aiSteps}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-black text-s6-text-main uppercase flex items-center gap-2">
                Active Tasks
                <span className="text-xs bg-s6-primary text-white border-2 border-s6-border-dark px-2 py-0.5 rounded font-bold shadow-[2px_2px_0px_#000]">
                  {tasks.length}
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {doneTask ? (
                <div className="bg-s6-mint-light/30 border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 shadow-bold-sm">
                  <div className="relative flex items-center">
                    <input checked readOnly className="bold-checkbox" type="checkbox" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-base font-bold text-s6-text-muted line-through decoration-2 decoration-s6-border-dark/50">
                      {doneTask.title}
                    </span>
                  </div>
                  <div className="text-s6-mint">
                    <span className="material-symbols-outlined font-bold">check_circle</span>
                  </div>
                </div>
              ) : (
                <div className="bg-s6-mint-light/30 border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 shadow-bold-sm text-s6-text-muted">
                  暂无已完成任务
                </div>
              )}

              {urgentTask ? (
                <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 relative overflow-visible shadow-bold transition-transform hover:-translate-y-1 hover:shadow-bold-lg">
                  <div className="relative flex items-center">
                    <input className="bold-checkbox peer" type="checkbox" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-base font-bold text-s6-text-main">{urgentTask.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black uppercase text-white bg-s6-coral border border-s6-border-dark px-2 py-0.5 rounded shadow-[2px_2px_0px_#1E293B]">
                        Urgent
                      </span>
                      <span className="text-xs text-s6-text-muted font-bold">{urgentTask.dueAt ? new Date(urgentTask.dueAt).toLocaleDateString() : ""}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 shadow-bold-sm text-s6-text-muted">
                  暂无紧急任务
                </div>
              )}

              {normalTask ? (
                <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 relative overflow-visible shadow-bold-sm hover:shadow-bold transition-all">
                  <div className="relative flex items-center">
                    <input className="bold-checkbox" type="checkbox" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-base font-bold text-s6-text-main">{normalTask.title}</span>
                    <span className="text-xs text-s6-text-muted mt-0.5 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">event</span>
                      {normalTask.dueAt ? new Date(normalTask.dueAt).toLocaleDateString() : "未设置时间"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex items-center gap-4 shadow-bold-sm text-s6-text-muted">
                  暂无待办任务
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-s6-text-main px-1 mb-4 uppercase">Resources</h3>
            <div className="grid grid-cols-2 gap-4">
              {resources.length === 0 && (
                <div className="col-span-2 bg-white border-2 border-dashed border-s6-border-dark rounded-xl p-4 text-center text-xs font-bold text-s6-text-muted">
                  暂无资源
                </div>
              )}
              {resources.slice(0, 2).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  className="bg-white border-2 border-s6-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-all cursor-pointer shadow-bold active:shadow-bold-active active:translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 border-2 border-s6-border-dark flex items-center justify-center text-s6-primary shadow-sm">
                    <span className="material-symbols-outlined text-2xl font-bold">menu_book</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-s6-text-main line-clamp-1">{res.title}</p>
                    <p className="text-[10px] text-s6-text-main font-bold uppercase tracking-wider mt-1 bg-slate-100 border border-s6-border-dark px-2 py-0.5 rounded inline-block">
                      {res.type || "Link"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <button className="fixed bottom-nav-safe-lg right-8 w-14 h-14 bg-s6-primary text-white rounded-2xl shadow-bold flex items-center justify-center hover:scale-105 active:scale-95 active:shadow-bold-active transition-all z-50 border-2 border-s6-border-dark">
          <span className="material-symbols-outlined text-2xl font-bold">edit</span>
        </button>
      </div>
    </div>
  );
}
