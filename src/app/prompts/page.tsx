
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type PromptItem = {
  id: string;
  title: string;
  category?: string | null;
  content: string;
  tags: string[];
  favorite: boolean;
  usageCount: number;
};

export default function PromptManager() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [promptData, categoryData] = await Promise.all([
          apiFetch<{ items: PromptItem[] }>("/prompts?page_size=50"),
          apiFetch<string[]>("/prompt-categories"),
        ]);
        if (!mounted) return;
        setPrompts(promptData.items || []);
        setCategories(categoryData || []);
      } catch (err) {
        if (!mounted) return;
        setStatus(err instanceof Error ? err.message : "????");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchCategory = selectedCategory === "All" || prompt.category === selectedCategory;
      const matchQuery =
        !query ||
        prompt.title.toLowerCase().includes(query.toLowerCase()) ||
        prompt.content.toLowerCase().includes(query.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [prompts, selectedCategory, query]);

  const handleFavorite = async (id: string) => {
    setStatus("");
    try {
      const updated = await apiFetch<PromptItem>(`/prompts/${id}/favorite`, { method: "POST" });
      setPrompts((prev) => prev.map((prompt) => (prompt.id === id ? { ...prompt, favorite: updated.favorite } : prompt)));
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "????");
    }
  };

  const handleRun = async (id: string) => {
    try {
      const updated = await apiFetch<PromptItem>(`/prompts/${id}/run`, { method: "POST" });
      setPrompts((prev) => prev.map((prompt) => (prompt.id === id ? { ...prompt, usageCount: updated.usageCount } : prompt)));
    } catch {
      return;
    }
  };

  const categoryList = ["All", ...categories.filter(Boolean)];

  return (
    <div className="font-jakarta bg-s2-background-light text-s2-text-main min-h-screen">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-s2-background-light border-b-2 border-s2-border-bold">
          <Link
            href="/notes"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-s2-border-bold shadow-flat-sm active:shadow-flat-active active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-s2-text-main" style={{ fontSize: "24px" }}>
              arrow_back
            </span>
          </Link>
          <h2 className="text-s2-text-main text-xl font-extrabold leading-tight tracking-[-0.015em] flex-1 text-center uppercase">
            Prompt Manager
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white border-2 border-s2-border-bold shadow-flat-sm active:shadow-flat-active active:translate-x-[2px] active:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined text-s2-text-main" style={{ fontSize: "24px" }}>
                more_vert
              </span>
            </button>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="w-full bg-[#E0F7FA] border-2 border-s2-border-bold rounded-xl shadow-flat overflow-hidden relative min-h-[180px] flex items-center justify-between p-6">
            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-white rounded-full border-2 border-s2-border-bold opacity-50"></div>
            <div className="absolute bottom-[-10px] right-[40%] w-16 h-16 bg-s2-primary rounded-full border-2 border-s2-border-bold opacity-50"></div>
            <div className="z-10 relative max-w-[60%]">
              <h1 className="text-s2-text-main text-2xl font-black mb-2 leading-tight">
                Prompt<br />Collection
              </h1>
              <p className="text-s2-text-main font-bold text-sm bg-white border-2 border-s2-border-bold px-3 py-1 rounded-full inline-block shadow-flat-sm">
                Organized by Hachiware!
              </p>
            </div>
            <div className="absolute right-[-10px] bottom-[-20px] w-[160px] h-[160px] z-10">
              <img
                alt="Chiikawa and Hachiware"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqCMSwot3cgTJ8e6ZufRU9xj6qTguHzKy7Yyos0eNwf1UGNk16qemIAaC24n9ku8GmEHc1mUqi78pL8-VnumpeSl2cpK-uSsBCuiePNxqNniz05PsVQdr0wadmB3QRIZw3bfNuT8slTUR-4Y_fv8BBxKk2zKdfXPPmgV5N39COeBC87etEt4N3_sItyncLJjiINaLF0mWS8EZShzrx60k3LBdETJ-wDJomUmcLBFErQFQx-hlo2UpovvkTuQ7yhNpjA33vXcFxHcI"
                style={{ filter: "drop-shadow(2px 2px 0px #2D2D2D)" }}
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <label className="flex flex-col h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl border-2 border-s2-border-bold bg-white shadow-flat transition-all focus-within:shadow-flat-hover">
              <div className="text-s2-text-main flex items-center justify-center pl-4">
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                  search
                </span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-transparent px-4 text-base font-bold text-s2-text-main placeholder:text-gray-400 focus:outline-0 focus:ring-0"
                placeholder="Find a prompt..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar pb-6">
          {categoryList.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border-2 border-s2-border-bold px-5 shadow-flat-sm cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-flat-active transition-all ${
                selectedCategory === category
                  ? "bg-s2-primary"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <p className="text-s2-text-main text-sm font-extrabold">{category}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-8 bg-s2-secondary border-2 border-s2-border-bold rounded-sm"></div>
            <h3 className="text-s2-text-main text-xl font-extrabold uppercase">Recent Prompts</h3>
          </div>
          <span className="text-s2-text-main text-sm font-bold border-b-2 border-s2-primary cursor-pointer hover:bg-s2-primary/20 transition-colors">
            View All
          </span>
        </div>

        {status && (
          <div className="px-4 pb-3">
            <div className="rounded-xl bg-rose-50 text-rose-600 text-sm font-bold px-4 py-2 border border-rose-200">
              {status}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 px-4 pb-32">
          {loading && (
            <div className="rounded-xl bg-white border-2 border-s2-border-bold p-6 text-sm font-bold text-gray-400">
              ???...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="rounded-xl bg-white border-2 border-s2-border-bold p-6 text-sm font-bold text-gray-400">
              ?? Prompt
            </div>
          )}
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => handleRun(prompt.id)}
              className="group flex flex-col rounded-xl bg-white border-2 border-s2-border-bold p-0 shadow-flat hover:shadow-flat-hover transition-all duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-start p-4 border-b-2 border-s2-border-bold bg-[#F3E5F5]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border-2 border-s2-border-bold text-s2-text-main">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h4 className="text-s2-text-main text-lg font-extrabold leading-tight">{prompt.title}</h4>
                    <div className="bg-white border border-s2-border-bold px-2 py-0.5 rounded-md inline-block mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-s2-text-main text-xs font-bold uppercase tracking-wide">
                        {prompt.category || "Uncategorized"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(prompt.id);
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-s2-border-bold shadow-flat-sm active:translate-y-1 active:shadow-none transition-all text-s2-text-main ${
                    prompt.favorite ? "bg-s2-primary" : "bg-white hover:bg-s2-primary"
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    star
                  </span>
                </button>
              </div>
              <div className="p-4 bg-white rounded-b-xl">
                <div className="mb-4 bg-s2-background-light p-3 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-s2-text-main font-medium text-sm line-clamp-2 leading-relaxed italic">
                    {prompt.content}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-2">
                    {prompt.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-s2-secondary border-2 border-s2-border-bold px-2 py-1 text-xs font-bold text-s2-text-main">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-s2-text-main bg-gray-100 px-2 py-1 rounded border-2 border-transparent">
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      repeat
                    </span>
                    <span>{prompt.usageCount}x</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-nav-safe-lg right-6 z-40">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-s2-accent border-2 border-s2-border-bold text-white shadow-flat hover:shadow-flat-hover active:translate-y-1 active:shadow-flat-active transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
              add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
