
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AIActionBar from "@/components/AIActionBar";
import { apiFetch } from "@/lib/api";

type Note = {
  id: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  tags: string[];
  coverImageUrl?: string | null;
  content: Array<{ type?: string; text?: string; code?: string; language?: string }>;
  updatedAt?: string;
};

function extractText(content: Note["content"]) {
  return content
    .map((block) => block.text || block.code || "")
    .filter(Boolean)
    .join("\n");
}

export default function NoteDetailPage() {
  const params = useParams();
  const noteId = params?.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await apiFetch<Note>(`/notes/${noteId}`);
        if (!mounted) return;
        setNote(data);
      } catch {
        if (!mounted) return;
        setNote(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (noteId) load();
    return () => {
      mounted = false;
    };
  }, [noteId]);

  const sourceText = useMemo(() => (note ? extractText(note.content || []) : ""), [note]);

  return (
    <div className="text-s4-flat-text antialiased overflow-hidden min-h-screen flex flex-col font-sans bg-s4-flat-bg selection:bg-s4-flat-primary/20 selection:text-s4-flat-primary">
      <div className="flex-none flex items-center px-6 py-4 justify-between z-20 sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Link
          href="/notes"
          className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 text-s4-flat-text hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex flex-col items-center">
          <h2 className="text-s4-flat-text text-lg font-bold tracking-tight font-display">我的笔记本</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="block w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-semibold text-s4-flat-text-light uppercase tracking-wide">已同步</span>
          </div>
        </div>
        <button className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 text-s4-flat-text hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto w-full relative pb-[calc(14rem+var(--bottom-nav-space))] scroll-smooth">
        <div className="px-6 pt-6 pb-2 max-w-2xl mx-auto">
          {loading && (
            <div className="rounded-2xl bg-white border border-gray-200 p-6 text-sm font-semibold text-s4-flat-text-light">
              加载中...
            </div>
          )}
          {!loading && !note && (
            <div className="rounded-2xl bg-white border border-gray-200 p-6 text-sm font-semibold text-rose-500">
              笔记不存在
            </div>
          )}
          {note && (
            <>
              <div className="flex flex-col gap-2 mb-8 relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-md bg-s4-flat-primary/10 text-xs font-bold text-s4-flat-primary tracking-wide uppercase border border-s4-flat-primary/20">
                    AI 摘要
                  </span>
                  <span className="text-xs font-medium text-s4-flat-text-light flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ""}
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold text-s4-flat-text leading-[1.1] font-display tracking-tight">
                  {note.title}
                  {note.subtitle && (
                    <span className="block text-2xl font-semibold text-s4-flat-text-light mt-2">
                      {note.subtitle}
                    </span>
                  )}
                </h1>
                <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-2">
                  {note.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="flex-none px-3 py-1.5 rounded-md bg-white border border-gray-200 text-s4-flat-text-light text-sm font-medium hover:border-s4-flat-primary/50 transition-colors"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>

              {note.summary && (
                <div className="relative z-10 border-l-4 border-s4-flat-primary pl-4 py-1 mb-8">
                  <p className="text-s4-flat-text text-lg leading-relaxed font-normal">{note.summary}</p>
                </div>
              )}

              <div className="bg-white space-y-6 relative">
                {note.content?.length === 0 && (
                  <div className="rounded-xl bg-s4-flat-surface border border-gray-200 p-5 text-sm text-s4-flat-text-light">
                    暂无内容
                  </div>
                )}
                {note.content?.map((block, idx) => {
                  if (block.type === "code" || block.code) {
                    return (
                      <div key={`${block.language || "code"}-${idx}`} className="rounded-xl bg-gray-900 p-4 font-mono text-sm border border-gray-800">
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700">
                          <span className="text-xs font-bold text-gray-400">{(block.language || "CODE").toUpperCase()}</span>
                          <span className="material-symbols-outlined text-gray-500 text-sm">content_copy</span>
                        </div>
                        <code className="block text-gray-300 whitespace-pre-wrap">
                          {block.code || ""}
                        </code>
                      </div>
                    );
                  }
                  return (
                    <p key={`p-${idx}`} className="text-s4-flat-text/80 leading-relaxed text-sm">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <AIActionBar sourceText={sourceText} />
    </div>
  );
}
