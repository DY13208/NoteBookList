"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Task = {
  id: string;
  title: string;
  reward: number;
  kind: string;
  status: "todo" | "done" | "claimed";
  progress: number;
};

export default function PointsAndTasks() {
  const [balance, setBalance] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [balanceData, tasksData] = await Promise.all([
        apiFetch<{ balance: number }>("/points/balance"),
        apiFetch<{ items: Task[] }>("/points/tasks"),
      ]);
      setBalance(balanceData.balance || 0);
      setTasks(tasksData.items || []);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const findTask = (kind: string) => tasks.find((task) => task.kind === kind);

  const handleAction = async (task?: Task) => {
    if (!task) return;
    setStatus("");
    try {
      if (task.kind === "check_in") {
        await apiFetch("/points/check-in", { method: "POST" });
      } else if (task.kind === "share_progress") {
        await apiFetch("/points/share-progress", { method: "POST" });
      } else if (task.status === "done") {
        await apiFetch(`/points/tasks/${task.id}/claim`, { method: "POST" });
      } else {
        return;
      }
      await load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "操作失败");
    }
  };

  const checkIn = findTask("check_in");
  const share = findTask("share_progress");
  const finishNote = findTask("finish_note");
  const finishProject = findTask("finish_project");

  return (
    <div className="font-jakarta bg-[#f8f5f7] dark:bg-[#221017] text-[#181114] dark:text-white min-h-screen selection:bg-[#f4257b] selection:text-white pb-32">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="sticky top-0 z-50 flex items-center bg-[#f8f5f7] dark:bg-[#221017] p-4 pb-2 justify-between border-b-2 border-transparent dark:border-white/10 transition-all">
          <Link href="/" className="text-[#181114] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 rounded-full pl-1 transition-colors">
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          </Link>
          <h2 className="text-[#181114] dark:text-white text-xl font-extrabold leading-tight tracking-tight flex-1 text-center">积分与任务</h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-xl h-12 text-[#181114] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors w-12">
              <span className="material-symbols-outlined text-[28px]">more_horiz</span>
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="w-full bg-white dark:bg-[#f4257b]/20 border-2 border-[#f4257b] rounded-xl p-6 flex flex-row items-center justify-between shadow-[4px_4px_0px_0px_rgba(244,37,123,1)]">
            <div className="flex flex-col gap-1">
              <p className="text-[#f4257b] dark:text-pink-300 text-sm font-bold uppercase tracking-wider">总余额</p>
              <div className="flex items-baseline gap-2">
                <h1 className="text-5xl font-black text-[#181114] dark:text-white tracking-tighter">
                  {balance.toLocaleString()}
                </h1>
                <span className="text-2xl font-bold text-[#f4257b]">积分</span>
              </div>
              <div className="flex items-center gap-1 mt-1 bg-green-100 dark:bg-green-900/30 w-fit px-2 py-1 rounded-lg border border-green-200 dark:border-green-800">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">trending_up</span>
                <p className="text-green-600 dark:text-green-400 text-sm font-bold">今日 +{checkIn?.reward ?? 0}</p>
              </div>
            </div>
            <div className="h-24 w-24 bg-[#f4257b]/10 rounded-full border-2 border-[#f4257b] flex items-center justify-center overflow-hidden shrink-0">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXwcix87b6sRsVr-HkKwiS_OK1Oh4B8BbkeeUPsbNHMjJPGiADDPzR1NbE7odmp6_rnxp2HCkpgnqz7yeI36aZ52g4Pu-zlX9XGpR_jDtorlNKjP95CB8dncnktNQzY65cnMvS24TiGFZGxaR8yEqElQokbYj3rHlye67UXIXNvoZbQWgQNGDC5qRRsToZrpjgQxRM72DlsHxYty4idcWQnbPkpCIUvdP0_mPEY5doHElUDAT1VoaDkmevTKGJ_CRJ25k-tLXmOKk")' }}
              ></div>
            </div>
          </div>
          <Link
            href="/shop"
            className="w-full flex items-center justify-between rounded-xl border-2 border-[#181114] bg-white px-4 py-3 shadow-[2px_2px_0px_0px_rgba(24,17,20,1)] hover:bg-[#f4257b]/5 transition-colors"
          >
            <span className="text-sm font-extrabold text-[#181114]">去积分商城兑换</span>
            <span className="material-symbols-outlined text-[#f4257b]">shopping_bag</span>
          </Link>

          {status && (
            <div className="rounded-xl bg-red-50 text-red-600 text-sm font-bold px-4 py-2 border border-red-200">
              {status}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 auto-rows-min">
            <button
              type="button"
              onClick={() => handleAction(checkIn)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#A8D0FF] dark:bg-[#3b5998] border-2 border-[#181114] dark:border-white/50 p-4 shadow-[4px_4px_0px_0px_rgba(24,17,20,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-transform active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(24,17,20,1)] cursor-pointer"
            >
              <div className="absolute right-[-10px] top-[-10px] size-16 rotate-12 bg-white/30 rounded-full"></div>
              <div className="flex justify-between items-start z-10">
                <span className="material-symbols-outlined text-[#181114] dark:text-white text-3xl">calendar_month</span>
                <span className="bg-white dark:bg-black/30 text-[#181114] dark:text-white text-xs font-black px-2 py-1 rounded-lg border border-[#181114]/20">+{checkIn?.reward ?? 0}</span>
              </div>
              <div className="mt-4 z-10">
                <p className="text-[#181114] dark:text-white text-lg font-bold leading-tight">每日<br/>签到</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[#181114]/70 dark:text-white/70 text-sm">check_circle</span>
                  <p className="text-[#181114]/70 dark:text-white/70 text-xs font-semibold">
                    {checkIn?.status === "done" || checkIn?.status === "claimed" ? "已完成" : "未开始"}
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleAction(share)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#FCE7F3] dark:bg-[#831843] border-2 border-[#181114] dark:border-white/50 p-4 shadow-[4px_4px_0px_0px_rgba(24,17,20,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-transform active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(24,17,20,1)] cursor-pointer"
            >
              <div className="flex justify-between items-start z-10">
                <span className="material-symbols-outlined text-[#181114] dark:text-white text-3xl">share</span>
                <span className="bg-white dark:bg-black/30 text-[#181114] dark:text-white text-xs font-black px-2 py-1 rounded-lg border border-[#181114]/20">+{share?.reward ?? 0}</span>
              </div>
              <div className="mt-4 z-10 relative">
                <p className="text-[#181114] dark:text-white text-lg font-bold leading-tight">分享<br/>进度</p>
                <p className="text-[#181114]/70 dark:text-white/70 text-xs font-semibold mt-1">
                  {share?.status === "done" || share?.status === "claimed" ? "已完成" : "未开始"}
                </p>
              </div>
              <div
                className="absolute bottom-[-10px] right-[-10px] w-16 h-16 rounded-full border-2 border-black overflow-hidden bg-white"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANGMWPr_SZCLJUzL9QjfHy7fxMUi7hkgks7CoGQD5nILAUDZyulwGAFl4-gz3YbqzTugyCnD_ATCkOi6ldKYFz30AFEtp-MMKApshy3r7wFlyzt4SYjwtX0Y7uWV8l5uoi8WpRs-aMkP7ySPBFMQvn32SVscaCSFntHxZhD0rObgiSi-eCts0jk54kuEzY_i8-4E3GJjRDpWzVI273Q84KXat7C5_HTv5d71YhdYkjlUgQ9IsMhbXBkOoqccixq7Js7QpJcKd3ES4")', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
            </button>

            <button
              type="button"
              onClick={() => handleAction(finishNote)}
              className="col-span-2 group relative overflow-hidden rounded-xl bg-[#FFE5A3] dark:bg-[#78350f] border-2 border-[#181114] dark:border-white/50 p-5 shadow-[4px_4px_0px_0px_rgba(24,17,20,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-transform active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(24,17,20,1)] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#181114] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[#181114]">edit_note</span>
                  </div>
                  <div>
                    <p className="text-[#181114] dark:text-white text-lg font-bold leading-none">完成一篇笔记</p>
                    <p className="text-[#181114]/70 dark:text-white/70 text-xs font-semibold mt-1">每日学习任务</p>
                  </div>
                </div>
                <span className="bg-[#181114] text-white text-xs font-black px-3 py-1 rounded-full">+{finishNote?.reward ?? 0} 积分</span>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex-1 h-5 bg-white rounded-lg overflow-hidden border-2 border-[#181114] p-0.5">
                  <div className="h-full bg-[#181114] dark:bg-[#78350f] rounded-md" style={{ width: `${finishNote?.progress ?? 0}%` }}></div>
                </div>
                <p className="text-[#181114] dark:text-white text-sm font-bold font-mono bg-white/50 dark:bg-black/30 px-2 py-0.5 rounded">
                  {finishNote?.progress ?? 0}%
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleAction(finishProject)}
              className="col-span-2 group relative overflow-hidden rounded-xl bg-[#A3EBB1] dark:bg-[#064e3b] border-2 border-[#181114] dark:border-white/50 p-6 shadow-[4px_4px_0px_0px_rgba(24,17,20,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-transform active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(24,17,20,1)] cursor-pointer"
            >
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="bg-[#181114] text-[#A3EBB1] text-xs font-bold uppercase px-2 py-1 rounded border border-transparent tracking-widest">重大目标</span>
                  <span className="bg-white text-[#181114] text-sm font-black px-3 py-1 rounded-lg border-2 border-[#181114] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">+{finishProject?.reward ?? 0} 积分</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div
                    className="w-16 h-16 shrink-0 bg-white border-2 border-[#181114] rounded-xl overflow-hidden shadow-sm"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBF56pYW0DD-t0UStSgxvwWoCafXj-mihDG92GK4kpHiCRWDNkD7r1gEpvAJjk65GsI8vD3udDGDnfpZE7Wqyyv-eLLvyfB2MdEIVXAccyHmga4vLtFTh_q37vos4k6dgVkvD9BP_sgqE3PBiAtDraZwCdj_QRQZB4V8DcxyeKoz2C7Xn0vggempkjbQchAdRF1jOzsCJnAf_c-9bdB_IwvoWwRUkPYkWMMHgBb6FkP5nmC88QOJXb7mkgS1_CSl_lu8vgTQ3iMKDE")', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  ></div>
                  <div>
                    <h3 className="text-[#181114] dark:text-white text-xl font-extrabold leading-tight">完成一个项目</h3>
                    <p className="text-[#181114]/80 dark:text-white/80 text-sm font-medium mt-1 leading-snug">完成核心里程碑即可领取</p>
                  </div>
                </div>
                <div className="mt-2 bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-[#181114]/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-[#181114] dark:text-white uppercase tracking-wide">进度</span>
                    <span className="text-xs font-bold text-[#181114] dark:text-white">{finishProject?.progress ?? 0}%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full border-2 border-[#181114] overflow-hidden">
                    <div className="h-full bg-[#f4257b] rounded-r-sm" style={{ width: `${finishProject?.progress ?? 0}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
            </button>
          </div>

          {loading && (
            <div className="text-xs text-gray-400 font-bold text-center pt-2">加载中...</div>
          )}
        </div>
      </div>
    </div>
  );
}
