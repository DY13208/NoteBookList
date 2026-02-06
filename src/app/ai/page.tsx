"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type AiModel = {
  provider: string;
  id: string;
  label: string;
  description?: string;
};

export default function AiSettingsPage() {
  const [models, setModels] = useState<AiModel[]>([]);
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");
  const [configured, setConfigured] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const modelList = await apiFetch<AiModel[]>("/ai/models");
        setModels(modelList);
        if (modelList.length > 0) {
          setProvider(modelList[0].provider);
          setModel(modelList[0].id);
        }
        const cfg = await apiFetch<{ configured: boolean; provider?: string; model?: string }>(
          "/ai/config",
        );
        if (cfg.configured) {
          setConfigured(true);
          if (cfg.provider) setProvider(cfg.provider);
          if (cfg.model) setModel(cfg.model);
        }
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "加载失败");
      }
    };
    init();
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await apiFetch("/ai/config", {
        method: "POST",
        body: JSON.stringify({ provider, model, api_key: apiKey }),
      });
      setConfigured(true);
      setApiKey("");
      setStatus("保存成功");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "保存失败");
    } finally {
      setLoading(false);
    }
  };

  const modelOptions = models.filter((m) => m.provider === provider);

  return (
    <div className="min-h-screen bg-[#f8f5f7] text-[#181114] font-jakarta">
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        <header className="flex items-center justify-between mb-6">
          <Link
            href="/profile"
            className="flex size-10 items-center justify-center rounded-lg bg-white border-2 border-[#2D2D2D]/20 hover:bg-gray-50 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="text-lg font-black uppercase tracking-tight">AI 设置</h1>
          <div className="size-10"></div>
        </header>

        <div className="rounded-3xl border-2 border-[#2D2D2D]/10 bg-white p-5 shadow-[0_10px_24px_rgba(45,45,45,0.12)] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">状态</p>
              <h2 className="text-xl font-black text-[#181114]">
                {configured ? "已绑定 Key" : "未绑定 Key"}
              </h2>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-black ${configured ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
              {configured ? "READY" : "NEEDS KEY"}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSave}>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">模型提供方</span>
              <select
                className="h-12 rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 text-base font-bold outline-none focus:border-[#FF9F1C]"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                {Array.from(new Set(models.map((m) => m.provider))).map((p) => (
                  <option key={p} value={p}>
                    {p.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">模型</span>
              <select
                className="h-12 rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 text-base font-bold outline-none focus:border-[#FF9F1C]"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {modelOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">API Key</span>
              <input
                className="h-12 rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 text-base font-semibold outline-none focus:border-[#FF9F1C]"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </label>

            {status && (
              <div className="rounded-2xl bg-[#FFF0D6] text-[#FF7A00] text-sm font-bold px-4 py-2 border border-[#FF9F1C]/40">
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !apiKey}
              className="w-full h-12 rounded-2xl bg-[#FF9F1C] text-white font-black border-2 border-[#2D2D2D]/20 shadow-[2px_2px_0px_rgba(45,45,45,0.2)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-60"
            >
              {loading ? "保存中..." : "保存设置"}
            </button>
          </form>

          <div className="text-xs text-[#7A6C5D] leading-relaxed">
            你的 Key 会加密存储，仅用于调用对应模型接口。
          </div>
        </div>
      </div>
    </div>
  );
}
