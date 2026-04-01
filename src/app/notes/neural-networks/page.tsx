"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AINotebook() {
  const router = useRouter();
  const [isAiExpanded, setIsAiExpanded] = useState(true);

  return (
    <div className="text-s4-flat-text antialiased overflow-hidden h-screen flex flex-col font-sans bg-s4-flat-bg selection:bg-s4-flat-primary/20 selection:text-s4-flat-primary">
      {/* Header */}
      <div className="flex-none flex items-center px-6 py-4 justify-between z-20 sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 text-s4-flat-text hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-s4-flat-text text-lg font-bold tracking-tight font-display">笔记详情</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="block w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-semibold text-s4-flat-text-light uppercase tracking-wide">已同步</span>
          </div>
        </div>
        <button className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 text-s4-flat-text hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto w-full relative pb-56 scroll-smooth">
        <div className="px-6 pt-6 pb-2 max-w-2xl mx-auto">
          {/* Title and Tags */}
          <div className="flex flex-col gap-2 mb-8 relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-md bg-s4-flat-primary/10 text-xs font-bold text-s4-flat-primary tracking-wide uppercase border border-s4-flat-primary/20">
                AI Summary
              </span>
              <span className="text-xs font-medium text-s4-flat-text-light flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                2 min read
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-s4-flat-text leading-[1.1] font-display tracking-tight">
              Neural Networks
              <span className="block text-2xl font-semibold text-s4-flat-text-light mt-2">Intro 101</span>
            </h1>
            <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-2">
              <div className="flex-none px-3 py-1.5 rounded-md bg-s4-flat-surface border border-gray-200 text-s4-flat-text text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-s4-flat-primary">folder</span>
                Project Alpha
              </div>
              <div className="flex-none px-3 py-1.5 rounded-md bg-white border border-gray-200 text-s4-flat-text-light text-sm font-medium hover:border-s4-flat-primary/50 transition-colors">
                #DeepLearning
              </div>
              <div className="flex-none px-3 py-1.5 rounded-md bg-white border border-gray-200 text-s4-flat-text-light text-sm font-medium hover:border-s4-flat-primary/50 transition-colors">
                #Algorithms
              </div>
            </div>
          </div>

          <div className="bg-white space-y-8 relative">
            {/* Summary Block */}
            <div className="relative z-10 border-l-4 border-s4-flat-primary pl-4 py-1">
              <p className="text-s4-flat-text text-lg leading-relaxed font-normal">
                Neural networks are a series of algorithms that recognize relationships in data through a process
                mimicking the{' '}
                <span className="bg-yellow-100 px-1 font-bold text-s4-flat-text">human brain</span>.
              </p>
            </div>

            {/* Concept Card */}
            <div className="rounded-xl bg-s4-flat-surface border border-gray-200 p-0 relative z-10 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-s4-flat-primary">grid_3x3</span>
                  <h3 className="font-bold text-s4-flat-text text-lg font-display">Perceptrons</h3>
                </div>
                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase tracking-wider">
                  Hard Concept
                </span>
              </div>
              <div className="p-5 relative">
                <div className="absolute right-2 top-2 w-24 h-24 z-20 pointer-events-none transform rotate-6 animate-sticker-bounce">
                  {/* Inline SVG Sticker Placeholder */}
                  <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100">
                    <path d="M25 40 Q25 20 50 20 Q75 20 75 40 L75 75 Q75 90 50 90 Q25 90 25 75 Z" fill="#FFFFFF" stroke="#333" strokeWidth="2.5"></path>
                    <circle cx="30" cy="25" fill="#FFFFFF" r="8" stroke="#333" strokeWidth="2.5"></circle>
                    <circle cx="70" cy="25" fill="#FFFFFF" r="8" stroke="#333" strokeWidth="2.5"></circle>
                    <circle cx="40" cy="50" fill="#333" r="2.5"></circle>
                    <circle cx="60" cy="50" fill="#333" r="2.5"></circle>
                    <path d="M45 55 Q50 60 55 55" fill="none" stroke="#333" strokeLinecap="round" strokeWidth="2"></path>
                    <path d="M25 35 Q20 35 22 45 Q28 45 25 35 Z" fill="#60A5FA"></path>
                    <path d="M78 45 Q83 45 80 55 Q74 55 78 45 Z" fill="#60A5FA"></path>
                  </svg>
                </div>
                <p className="text-s4-flat-text/80 leading-relaxed mb-6 pr-16 text-sm">
                  The simplest form is the <span className="font-bold text-s4-flat-text">Perceptron</span>. A single
                  neuron model with weights &amp; bias.
                </p>
                <div className="rounded-lg bg-gray-900 p-4 relative group font-mono text-sm border border-gray-800">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700">
                    <span className="text-xs font-bold text-gray-400">PYTHON</span>
                    <span className="material-symbols-outlined text-gray-500 text-sm cursor-pointer hover:text-white">
                      content_copy
                    </span>
                  </div>
                  <code className="block text-gray-300">
                    <span className="text-purple-400">def</span> perceptron(x, w, b):<br />
                    <span className="text-gray-500">  # Dot product</span><br />
                      <span className="text-purple-400">return</span> step(dot(x, w) + b)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Action Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[110] pointer-events-none pb-safe">
        <div className={`w-full max-w-md mx-auto bg-white border-t-2 border-black/5 dark:border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 pointer-events-auto rounded-t-3xl relative bottom-[96px]`}>
          {/* Toggle Header */}
          <button
            onClick={() => setIsAiExpanded(!isAiExpanded)}
            className="w-full pt-4 pb-2 px-6 flex items-center justify-between group"
          >
            <h3 className="text-sm font-black text-s4-flat-text-light uppercase tracking-widest">AI 操作</h3>
            <span className={`material-symbols-outlined text-s4-flat-primary transition-transform duration-300 ${isAiExpanded ? 'rotate-180' : ''}`}>
              keyboard_arrow_up
            </span>
          </button>

          <div className={`px-6 transition-all duration-300 overflow-hidden ${isAiExpanded ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <button className="group flex flex-col items-center w-full">
                <div className="w-full h-14 rounded-2xl bg-s4-flat-primary hover:bg-indigo-600 transition-all flex items-center justify-center text-white mb-2 shadow-[0_4px_0_0_rgba(67,56,202,1)] active:translate-y-1 active:shadow-none">
                  <span className="material-symbols-outlined text-2xl">segment</span>
                </div>
                <span className="text-xs font-black text-s4-flat-text uppercase tracking-tight">摘要</span>
              </button>
              <button className="group flex flex-col items-center w-full">
                <div className="w-full h-14 rounded-2xl bg-s4-flat-accent hover:bg-rose-600 transition-all flex items-center justify-center text-white mb-2 shadow-[0_4px_0_0_rgba(190,18,60,1)] active:translate-y-1 active:shadow-none">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                </div>
                <span className="text-xs font-black text-s4-flat-text uppercase tracking-tight">提取</span>
              </button>
              <button className="group flex flex-col items-center w-full">
                <div className="w-full h-14 rounded-2xl bg-s4-flat-yellow hover:bg-amber-600 transition-all flex items-center justify-center text-white mb-2 shadow-[0_4px_0_0_rgba(180,83,9,1)] active:translate-y-1 active:shadow-none">
                  <span className="material-symbols-outlined text-2xl">quiz</span>
                </div>
                <span className="text-xs font-black text-s4-flat-text uppercase tracking-tight">测验</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
