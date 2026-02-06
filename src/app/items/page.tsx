"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Item = {
  id: string;
  name: string;
  tags: string[];
  imageUrl?: string | null;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch<{ items: Item[] }>("/items");
        setItems(data.items);
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-jakarta">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="sticky top-0 z-50 flex items-center bg-[#FFF8E7]/95 p-4 pb-3 justify-between border-b-2 border-[#2D2D2D]/10 backdrop-blur">
          <Link href="/" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border-2 border-[#2D2D2D]/20 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h2 className="text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase">物品库</h2>
          <Link href="/items/new" className="flex size-10 items-center justify-center rounded-lg bg-[#FFB84D] text-white border-2 border-[#2D2D2D]/20 hover:brightness-105 transition-all">
            <span className="material-symbols-outlined text-2xl">add</span>
          </Link>
        </div>

        <div className="p-4 space-y-6 pb-28">
          <div className="rounded-3xl border-2 border-[#2D2D2D]/10 bg-white p-5 shadow-[0_10px_24px_rgba(45,45,45,0.12)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#7A6C5D]">我的物品</p>
                <h1 className="text-2xl font-black text-[#2D2D2D]">收藏与兑换</h1>
              </div>
              <div className="size-12 rounded-2xl bg-[#FFD580] flex items-center justify-center border-2 border-[#2D2D2D]/10">
                <span className="material-symbols-outlined text-2xl">inventory_2</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.length === 0 && (
              <div className="col-span-2 rounded-2xl border-2 border-dashed border-[#2D2D2D]/20 bg-white/70 p-6 text-center text-sm font-bold text-[#7A6C5D]">
                还没有物品，点击右上角新增
              </div>
            )}
            {items.map((item) => (
              <div key={item.id} className="rounded-3xl border-2 border-[#2D2D2D]/10 bg-white p-3 shadow-[4px_4px_0px_rgba(45,45,45,0.1)]">
                <div className="aspect-[4/5] rounded-2xl bg-[#FFE9C7] flex items-center justify-center text-5xl overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>🎁</span>
                  )}
                </div>
                <div className="pt-3 space-y-1">
                  <p className="text-sm font-black line-clamp-1">{item.name}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-[#FFE6EB] px-2 py-0.5 text-[10px] font-bold text-[#FF5B8A]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-3xl border-2 border-dashed border-[#2D2D2D]/20 bg-white/70 p-3 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-3xl text-[#2D2D2D]/50">add_box</span>
              <p className="mt-2 text-xs font-bold text-[#2D2D2D]/60">创建新物品</p>
              <Link href="/items/new" className="mt-2 text-xs font-black text-[#FF7A00] hover:underline">
                立即创建
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
