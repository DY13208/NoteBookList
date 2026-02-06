"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function NewItemPage() {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
  };

  const removeTag = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag !== value));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  };

  const handleTagBlur = () => {
    if (!tagInput) return;
    tagInput
      .split(/,|，/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach(addTag);
    setTagInput("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const res = await fetch("/api/v1/uploads", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok || json.code !== 0) {
          throw new Error(json?.message || "上传失败");
        }
        imageUrl = json.data.url;
      }

      await apiFetch("/items", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          tags,
          image_url: imageUrl || undefined,
        }),
      });

      setStatus("创建成功");
      setName("");
      setDescription("");
      setTags([]);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-jakarta">
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        <header className="flex items-center justify-between mb-6">
          <Link
            href="/items"
            className="flex size-10 items-center justify-center rounded-lg bg-white border-2 border-[#2D2D2D]/20 hover:bg-gray-50 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="text-lg font-black uppercase tracking-tight">创建物品</h1>
          <div className="size-10"></div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border-2 border-[#2D2D2D]/10 bg-white p-5 shadow-[0_10px_24px_rgba(45,45,45,0.12)]"
        >
          <label className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">物品名称</span>
            <input
              className="h-12 rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 text-base font-bold outline-none focus:border-[#FF9F1C]"
              placeholder="例如：粉红兔兔主题"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">标签</span>
            <input
              className="h-12 rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 text-base font-semibold outline-none focus:border-[#FF9F1C]"
              placeholder="输入后回车添加，例如：主题/徽章/装饰"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleTagBlur}
            />
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.length === 0 && (
                <span className="text-[11px] font-bold text-[#FF7A00]">暂无标签</span>
              )}
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="rounded-full bg-[#FFF0D6] px-3 py-1 text-[11px] font-bold text-[#FF7A00] hover:bg-[#FFE0B2] transition-colors"
                >
                  {tag} <span className="ml-1">×</span>
                </button>
              ))}
            </div>
          </label>

          <label className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">封面图片</span>
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2D2D2D]/30 bg-[#FFF7EA] px-4 py-6 text-center gap-3">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-40 h-40 object-cover rounded-2xl border-2 border-[#2D2D2D]/10" />
              ) : (
                <span className="material-symbols-outlined text-3xl text-[#FF9F1C]">image</span>
              )}
              <input className="text-xs font-semibold" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </label>

          <label className="flex flex-col gap-2 mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">说明</span>
            <textarea
              className="min-h-[120px] rounded-2xl border-2 border-[#2D2D2D]/20 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF9F1C]"
              placeholder="描述物品用途或亮点"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          {status && (
            <div className="mb-4 rounded-xl bg-[#FFF0D6] text-[#FF7A00] text-sm font-bold px-4 py-2 border border-[#FF9F1C]/40">
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-[#FF9F1C] text-white font-black border-2 border-[#2D2D2D]/20 shadow-[2px_2px_0px_rgba(45,45,45,0.2)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-60"
          >
            {loading ? "保存中..." : "保存物品"}
          </button>
        </form>
      </div>
    </div>
  );
}
