"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ShopItem = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category?: string | null;
};

export default function PointsShop() {
  const router = useRouter();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [shopData, balanceData] = await Promise.all([
          apiFetch<{ items: ShopItem[] }>("/shop/items?page_size=50"),
          apiFetch<{ balance: number }>("/points/balance"),
        ]);
        if (!mounted) return;
        setItems(shopData.items || []);
        setBalance(balanceData.balance || 0);
      } catch (err) {
        if (!mounted) return;
        setStatus(err instanceof Error ? err.message : "加载失败");
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const themes = items.filter((item) => (item.category || "").includes("主题")).slice(0, 2);
  const icons = items.filter((item) => (item.category || "").includes("图标")).slice(0, 3);
  const fallbackItems = items.filter((item) => !themes.includes(item) && !icons.includes(item));

  const themeItems = themes.length ? themes : fallbackItems.slice(0, 2);
  const iconItems = icons.length ? icons : fallbackItems.slice(2, 5);

  const handleRedeem = async (itemId: string) => {
    setStatus("");
    try {
      await apiFetch("/shop/redeem", {
        method: "POST",
        body: JSON.stringify({ item_id: itemId }),
      });
      router.push("/shop/success");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "兑换失败");
    }
  };

  return (
    <div className="font-jakarta bg-[#FFF8E7] text-[#2D2D2D] antialiased selection:bg-[#FF9F1C] selection:text-white min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="sticky top-0 z-50 flex items-center bg-[#FFF8E7]/95 p-4 pb-3 justify-between border-b-2 border-[#2D2D2D]/10 backdrop-blur">
          <Link href="/profile" className="text-[#2D2D2D] flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border-2 border-[#2D2D2D]/20 hover:bg-gray-50 cursor-pointer transition-colors active:scale-95">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h2 className="text-[#2D2D2D] text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase">
            积分商城
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white text-[#2D2D2D] border-2 border-[#2D2D2D]/20 hover:bg-gray-50 transition-colors active:scale-95">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-32">
          {status && (
            <div className="rounded-xl bg-rose-50 text-rose-600 text-sm font-bold px-4 py-2 border border-rose-200">
              {status}
            </div>
          )}

          <div className="w-full flex flex-col overflow-hidden rounded-3xl bg-white border-2 border-[#2D2D2D]/10 shadow-[0_10px_24px_rgba(45,45,45,0.12)]">
            <div className="w-full aspect-[2/1] bg-[#FFE3BA] relative flex items-end justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-900 relative flex items-center justify-center translate-y-4">
                  <div className="absolute top-8 left-6 w-2 h-2 bg-slate-900 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-slate-900 rounded-full"></div>
                  <div className="w-2 h-1 bg-pink-300 rounded-full mt-2"></div>
                </div>
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-900 relative flex items-center justify-center translate-y-4 overflow-hidden">
                  <div className="absolute top-0 w-full h-8 bg-[#8BB7F0]"></div>
                  <div className="absolute top-8 left-6 w-2 h-2 bg-slate-900 rounded-full z-10"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-slate-900 rounded-full z-10"></div>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col items-center text-center bg-white border-t-2 border-[#2D2D2D]/10">
              <h1 className="text-2xl font-black text-[#FF7A00] mb-1 tracking-tight">积分商城</h1>
              <p className="text-[#7A6C5D] font-bold text-sm">用积分兑换主题、徽章与装饰。</p>
            </div>
          </div>

          <Link href="/points" className="flex flex-col items-center justify-center py-4 bg-white rounded-3xl border-2 border-[#2D2D2D]/10 hover:border-[#FF9F1C] transition-all cursor-pointer group shadow-[0_8px_18px_rgba(45,45,45,0.08)]">
            <div className="bg-[#FFF0D6] px-4 py-1.5 rounded-lg mb-2 group-hover:bg-[#FF9F1C] group-hover:text-white transition-colors">
              <p className="text-xs font-black uppercase tracking-widest">当前积分</p>
            </div>
            <div className="flex items-center gap-2 text-[#2D2D2D]">
              <span className="material-symbols-outlined text-4xl text-[#FF9F1C] group-hover:scale-110 transition-transform">monetization_on</span>
              <h2 className="tracking-tight text-5xl font-black leading-tight">{balance.toLocaleString()}</h2>
            </div>
            <div className="mt-2 text-xs font-bold text-[#FF7A00] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              前往积分任务 <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </Link>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#2D2D2D] text-white px-6 transition-transform active:scale-95 border-2 border-[#2D2D2D]">
              <span className="text-sm font-extrabold">全部</span>
            </button>
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-[#7A6C5D] px-6 hover:bg-gray-50 transition-colors border-2 border-[#2D2D2D]/20 active:scale-95">
              <span className="text-sm font-extrabold">主题</span>
            </button>
            <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-[#7A6C5D] px-6 hover:bg-gray-50 transition-colors border-2 border-[#2D2D2D]/20 active:scale-95">
              <span className="text-sm font-extrabold">图标</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[#2D2D2D] text-xl font-extrabold tracking-tight">主题</h3>
              <button className="text-[#FF7A00] text-sm font-black hover:opacity-80 uppercase tracking-wide">
                查看全部
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {themeItems.map((item, idx) => (
                <div key={item.id} className="group flex flex-col gap-3 p-3 bg-white rounded-3xl border-2 border-[#2D2D2D]/10 hover:border-[#FF9F1C] transition-colors shadow-[4px_4px_0px_rgba(45,45,45,0.08)]">
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative bg-[#F8BBD0] flex items-center justify-center border-2 border-transparent">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-6xl select-none">🌟</div>
                    )}
                    {idx === 0 && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-[#2D2D2D] rounded px-2 py-1 shadow-none border-2 border-yellow-500">
                        <span className="text-[10px] font-black uppercase tracking-wider">NEW</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col px-1">
                    <h4 className="text-[#2D2D2D] font-black text-base">{item.title}</h4>
                    <div className="flex items-center gap-1 text-[#FF7A00] mt-1">
                      <span className="text-xs font-black bg-[#FFF0D6] px-2 py-1 rounded text-[#FF7A00]">{item.price} 积分</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRedeem(item.id)}
                    className="w-full h-10 rounded-xl bg-[#2D2D2D] text-white text-sm font-extrabold hover:bg-[#1c1c1c] transition-colors flex items-center justify-center active:scale-95"
                  >
                    兑换
                  </button>
                </div>
              ))}
              {themeItems.length === 0 && (
                <div className="col-span-2 rounded-2xl border-2 border-dashed border-[#2D2D2D]/20 bg-white/70 p-6 text-center text-sm font-bold text-[#7A6C5D]">
                  暂无主题商品
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[#2D2D2D] text-xl font-extrabold tracking-tight">应用图标</h3>
              <button className="text-[#FF7A00] text-sm font-black hover:opacity-80 uppercase tracking-wide">查看全部</button>
            </div>
            <div className="flex flex-col gap-3">
              {iconItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-3 border-2 border-[#2D2D2D]/10 hover:border-[#FF9F1C] transition-colors shadow-[4px_4px_0px_rgba(45,45,45,0.06)]">
                  <div className="size-16 shrink-0 rounded-2xl bg-[#FFCDD2] flex items-center justify-center text-2xl overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>🎨</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#2D2D2D] font-black text-base truncate">{item.title}</h4>
                    <p className="text-[#7A6C5D] text-xs font-bold uppercase tracking-wide">{item.description || "限定图标"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRedeem(item.id)}
                    className="h-9 bg-[#FFF0D6] text-[#FF7A00] px-4 rounded-lg text-xs font-black hover:bg-[#FF9F1C] hover:text-white transition-colors uppercase"
                  >
                    {item.price} 积分
                  </button>
                </div>
              ))}
              {iconItems.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-[#2D2D2D]/20 bg-white/70 p-6 text-center text-sm font-bold text-[#7A6C5D]">
                  暂无图标商品
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
