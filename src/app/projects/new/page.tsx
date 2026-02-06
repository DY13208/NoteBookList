"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await apiFetch("/projects", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          due_at: dueAt ? new Date(dueAt).toISOString() : undefined,
        }),
      });
      setStatus("创建成功");
      setTitle("");
      setDescription("");
      setDueAt("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-s6-page-bg text-s6-text-main font-nunito">
      <div className="max-w-md mx-auto px-6 pt-8 pb-24">
        <header className="flex items-center justify-between mb-6">
          <Link href="/projects" className="bold-btn w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">arrow_back</span>
          </Link>
          <h1 className="text-xl font-black tracking-tight uppercase">New Project</h1>
          <div className="w-10 h-10"></div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border-2 border-s6-border-dark shadow-bold p-6"
        >
          <label className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-s6-text-muted">项目名称</span>
            <input
              className="h-12 rounded-2xl border-2 border-s6-border-dark px-4 text-base font-bold outline-none focus:border-s6-primary"
              placeholder="输入项目名称"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-s6-text-muted">目标描述</span>
            <textarea
              className="min-h-[140px] rounded-2xl border-2 border-s6-border-dark px-4 py-3 text-sm font-semibold outline-none focus:border-s6-primary"
              placeholder="描述你的目标与里程碑"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <label className="flex flex-col gap-2 mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-s6-text-muted">计划完成时间</span>
            <input
              type="date"
              className="h-12 rounded-2xl border-2 border-s6-border-dark px-4 text-base font-bold outline-none focus:border-s6-primary"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
            />
          </label>

          {status && (
            <div className="mb-4 rounded-xl bg-s6-mint-light text-s6-text-main text-sm font-bold px-4 py-2 border border-s6-border-dark/20">
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-s6-primary text-white font-black border-2 border-s6-border-dark shadow-bold-sm active:translate-y-[2px] active:shadow-bold-active transition-all disabled:opacity-60"
          >
            {loading ? "创建中..." : "创建项目"}
          </button>
        </form>
      </div>
    </div>
  );
}
