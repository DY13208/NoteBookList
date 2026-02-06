"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type Folder = {
  id: string;
  name: string;
  color?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type Note = {
  id: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  tags: string[];
  coverImageUrl?: string | null;
  folderId?: string | null;
  updatedAt?: string;
  createdAt?: string;
};

const fallbackFolderColors = ["bg-s3-flat-blue", "bg-s4-chiikawa-pink", "bg-s1-flat-mint"];
const tagColors = ["bg-purple-100 text-purple-700", "bg-pink-100 text-pink-700", "bg-yellow-100 text-yellow-700"];

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
}

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [folderData, noteData] = await Promise.all([
          apiFetch<Folder[]>("/note-folders"),
          apiFetch<{ items: Note[] }>("/notes?page_size=50"),
        ]);
        if (!mounted) return;
        setFolders(folderData || []);
        setNotes(noteData.items || []);
      } catch {
        if (!mounted) return;
        setFolders([]);
        setNotes([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const folderStats = useMemo(() => {
    const map = new Map<string, { count: number; latest?: string }>();
    for (const note of notes) {
      if (!note.folderId) continue;
      const current = map.get(note.folderId) || { count: 0, latest: undefined };
      const updated = note.updatedAt || note.createdAt;
      const latest = updated && (!current.latest || new Date(updated) > new Date(current.latest)) ? updated : current.latest;
      map.set(note.folderId, { count: current.count + 1, latest });
    }
    return map;
  }, [notes]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-s1-text-main dark:text-white font-jakarta overflow-x-hidden antialiased selection:bg-s1-flat-mint selection:text-black min-h-screen pb-24">
      <div className="max-w-md mx-auto border-x border-gray-100 dark:border-gray-800">
        <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-4 px-4 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10 border-2 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
            </button>
            <h2 className="text-xl font-extrabold tracking-tight flex-1 text-center">知识库</h2>
            <div className="flex w-10 items-center justify-end">
              <Link
                href="/notes/new"
                className="flex size-10 items-center justify-center rounded-full bg-s1-flat-mint text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <span className="material-symbols-outlined">add</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-black dark:border-white bg-s3-accent text-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
              <span className="text-sm font-bold">按日期</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">按标签</span>
            </button>
            <Link href="/prompts" className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">AI 建议</span>
              <span className="material-symbols-outlined text-s1-flat-mint text-[18px]">auto_awesome</span>
            </Link>
            <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2 hover:border-s1-flat-mint transition-colors">
              <span className="text-sm font-bold">收藏</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-6 p-4">
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-2xl font-extrabold tracking-tight">文件夹</h3>
              <button className="text-sm font-bold text-gray-500 hover:text-s1-flat-mint">查看全部</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
              {loading && (
                <div className="snap-start shrink-0 w-40 h-48 bg-white rounded-2xl border-[3px] border-dashed border-gray-300 p-4 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-gray-300">hourglass</span>
                  <p className="text-xs font-bold text-gray-400 mt-2">加载中...</p>
                </div>
              )}
              {!loading && folders.length === 0 && (
                <div className="snap-start shrink-0 w-40 h-48 bg-white rounded-2xl border-[3px] border-dashed border-gray-300 p-4 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-gray-300">folder_off</span>
                  <p className="text-xs font-bold text-gray-400 mt-2">暂无文件夹</p>
                </div>
              )}
              {folders.map((folder, index) => {
                const stats = folderStats.get(folder.id);
                const bgClass = fallbackFolderColors[index % fallbackFolderColors.length];
                return (
                  <div
                    key={folder.id}
                    className={`snap-start shrink-0 w-40 h-48 ${bgClass} rounded-2xl border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group`}
                    style={folder.color ? { backgroundColor: folder.color } : undefined}
                  >
                    <div className="flex justify-between items-start">
                      <span className="material-symbols-outlined text-3xl text-black">folder_open</span>
                      <div className="bg-white/50 rounded-full px-2 py-0.5 text-xs font-bold text-black border border-black/10">
                        {stats?.count ?? 0}
                      </div>
                    </div>
                    <div>
                      <p className="text-black font-extrabold text-lg leading-tight group-hover:underline decoration-2 underline-offset-2">
                        {folder.name}
                      </p>
                      <p className="text-black/70 text-xs font-semibold mt-1">
                        {stats?.latest ? `${formatDate(stats.latest)} 更新` : "暂无内容"}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="snap-start shrink-0 w-40 h-48 bg-white dark:bg-white/5 rounded-2xl border-[3px] border-dashed border-gray-300 dark:border-gray-600 p-4 flex flex-col items-center justify-center cursor-pointer hover:border-s1-flat-mint hover:bg-s1-flat-mint/5 transition-all">
                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-500 mb-2">create_new_folder</span>
                <p className="text-gray-400 dark:text-gray-500 font-bold text-sm">新建文件夹</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-2xl font-extrabold tracking-tight">最近笔记</h3>
              <div className="flex gap-2">
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined text-gray-500">grid_view</span>
                </button>
                <button className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                  <span className="material-symbols-outlined">view_list</span>
                </button>
              </div>
            </div>

            {notes.slice(0, 3).map((note, index) => {
              const tag = note.tags?.[0] || "笔记";
              const color = tagColors[index % tagColors.length];
              return (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border-2 border-gray-100 dark:border-gray-800 p-4 hover:border-s1-flat-mint/50 transition-all cursor-pointer"
                >
                  <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border-2 border-black relative">
                    <div className="absolute inset-0 bg-s1-flat-mint/20 z-10"></div>
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: note.coverImageUrl
                          ? `url("${note.coverImageUrl}")`
                          : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANlwsalDQl1LpL3XHkRBpjFdJJ1K9bpgW7TUjepNWhN-9v0aPxYPSJDv6rHPB5-a9xMcUU1is4qQONqzDTUxPn2krOsBNgqSqb3k3kInXdHvJ5z4jqvpVfrv9ih9bXm4g-OchdM3-5FJJiYGAs2clk1c5YAfTVar2kuLGDZ-ZpWIrlot-9g19OlAMPj2BV5m9yr8pBjr1fMV_tsfrMfaHNhCTieURTdqdqwrpLMX8fqVKXq26K7EnnL9XTSfoscwUWFxwwaqf7k5U")',
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className={`${color} text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider`}>
                          {tag}
                        </span>
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-s1-flat-mint">bookmark</span>
                      </div>
                      <h4 className="text-lg font-bold leading-tight text-gray-900 dark:text-white mb-1">
                        {note.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {note.summary || note.subtitle || "暂无摘要"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {formatDate(note.updatedAt || note.createdAt) || "刚刚"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {!loading && notes.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6 text-center text-sm font-bold text-gray-400">
                暂无笔记，点击右上角新建
              </div>
            )}
          </section>
        </main>

        <div className="fixed bottom-nav-safe-lg right-4 z-30 pointer-events-none">
          <div className="w-32 h-32 relative animate-sticker-bounce">
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-white dark:bg-gray-200 border-[3px] border-black rounded-full overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img
                alt="Cute flat illustration of Hachiware cat holding a folder"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcw4VZKTbRArMhvd7foS1DnZYK33ZqkICZdWKbGdNiY919X7Qjpmur5cyXF2ptZ_ixQPnp6Qp4GZdDvEqVjAAVbhxG9QYg7hIPMim5mm0pj6JwrSPdUd7cmBtwQf9fHaZj5kgk9fwvW4-PrcAv4LHODDYhw2Hv689r4LRHj4-lcIfEnl4EXRnZyxc5Q70rgFeLPJc47lQMIlZTkIy2HKpc-Qwu4rXmhRhg0j_K3NkIIAHGVzDVpfsfNVvUbDUdANxqOqFHd1q9bX8"
              />
            </div>
            <div className="absolute -top-2 right-16 bg-white border-2 border-black px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-bold text-black whitespace-nowrap">继续学习！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
