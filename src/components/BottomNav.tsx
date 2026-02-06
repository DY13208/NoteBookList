"use client";

import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  match: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "首页",
    icon: "home",
    match: (pathname) => pathname === "/",
  },
  {
    href: "/notes",
    label: "笔记",
    icon: "menu_book",
    match: (pathname) => pathname.startsWith("/notes") || pathname.startsWith("/prompts"),
  },
  {
    href: "/projects",
    label: "项目",
    icon: "dashboard_customize",
    match: (pathname) => pathname.startsWith("/projects"),
  },
  {
    href: "/items",
    label: "物品",
    icon: "inventory_2",
    match: (pathname) => pathname.startsWith("/items"),
  },
  {
    href: "/profile",
    label: "我的",
    icon: "person",
    match: (pathname) =>
      pathname.startsWith("/profile") ||
      pathname.startsWith("/trophy-room") ||
      pathname.startsWith("/points") ||
      pathname.startsWith("/shop"),
  },
];

export default function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 z-[120] w-[min(94vw,520px)] -translate-x-1/2"
      style={{ bottom: "calc(0.75rem + var(--nav-offset, 0px))" }}
    >
      <div className="relative flex items-center justify-between gap-1 rounded-[28px] border border-black/10 bg-white/85 px-3 py-2 shadow-[0_14px_32px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/90 via-white/70 to-white/40"></div>
        <div className="pointer-events-none absolute inset-x-6 -top-2 h-2 rounded-full bg-gradient-to-r from-transparent via-[#f4257b]/30 to-transparent"></div>
        {navItems.map((item) => {
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] font-bold tracking-wide transition-all ${
                isActive
                  ? "text-[#f4257b]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span
                className={`absolute -top-1 h-1.5 w-7 rounded-full transition-all ${
                  isActive ? "bg-[#f4257b]" : "bg-transparent"
                }`}
              ></span>
              <span
                className={`material-symbols-outlined text-[24px] transition-transform ${
                  isActive ? "scale-110" : "group-hover:-translate-y-0.5"
                }`}
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
