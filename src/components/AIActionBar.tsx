"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function AIActionBar({ sourceText }: { sourceText?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const runAction = async (action: "summary" | "extract" | "quiz") => {
    if (!sourceText) {
      setError("请先在笔记中选择内容");
      return;
    }
    setError("");
    setLoading(action);
    setResult("");
    try {
      const data = await apiFetch<{ summary?: string; highlights?: string; quiz?: string }>(
        `/ai/${action}`,
        {
          method: "POST",
          body: JSON.stringify({ text: sourceText }),
        },
      );
      setResult(data.summary || data.highlights || data.quiz || "");
    } catch (err) {
      const message = err instanceof Error ? err.message : "AI 请求失败";
      setError(message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="fixed bottom-nav-safe left-0 right-0 z-30 pb-safe transition-all duration-300">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-s4-flat-text-light">AI Actions</p>
              <p className="text-sm font-semibold text-s4-flat-text">
                {isOpen ? "收起工具栏" : "展开工具栏"}
              </p>
            </div>
            <span className="material-symbols-outlined text-xl text-s4-flat-text">
              {isOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          <div
            className={`grid grid-cols-3 gap-4 px-4 pb-4 overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <button type="button" onClick={() => runAction("summary")} className="group flex flex-col items-center w-full">
              <div className="w-full h-12 rounded-lg bg-s4-flat-primary hover:bg-indigo-600 transition-colors flex items-center justify-center text-white mb-2 shadow-md">
                <span className="material-symbols-outlined text-2xl">segment</span>
              </div>
              <span className="text-xs font-bold text-s4-flat-text">
                {loading === "summary" ? "处理中..." : "Summarize"}
              </span>
            </button>
            <button type="button" onClick={() => runAction("extract")} className="group flex flex-col items-center w-full">
              <div className="w-full h-12 rounded-lg bg-s4-flat-accent hover:bg-rose-600 transition-colors flex items-center justify-center text-white mb-2 shadow-md">
                <span className="material-symbols-outlined text-2xl">lightbulb</span>
              </div>
              <span className="text-xs font-bold text-s4-flat-text">
                {loading === "extract" ? "处理中..." : "Extract"}
              </span>
            </button>
            <button type="button" onClick={() => runAction("quiz")} className="group flex flex-col items-center w-full">
              <div className="w-full h-12 rounded-lg bg-s4-flat-yellow hover:bg-amber-600 transition-colors flex items-center justify-center text-white mb-2 shadow-md">
                <span className="material-symbols-outlined text-2xl">quiz</span>
              </div>
              <span className="text-xs font-bold text-s4-flat-text">
                {loading === "quiz" ? "处理中..." : "Quiz Me"}
              </span>
            </button>
          </div>
          {(error || result) && (
            <div className="border-t border-gray-100 px-4 pb-4">
              {error && (
                <div className="mt-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold px-3 py-2 border border-rose-200">
                  {error}
                  {error.includes("AI key") && (
                    <Link className="ml-2 underline" href="/ai">
                      去绑定
                    </Link>
                  )}
                </div>
              )}
              {result && (
                <div className="mt-3 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 border border-slate-200 whitespace-pre-wrap">
                  {result}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
