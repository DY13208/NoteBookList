"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide nav on login and signup pages, and note detail pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    (pathname.startsWith("/notes/") && pathname !== "/notes")
  ) {
    return null;
  }

  const navItems = [
    { href: "/", label: "首页", icon: "home" },
    { href: "/notes", label: "笔记", icon: "edit_note" },
    { href: "/trophy-room", label: "勋章", icon: "emoji_events" },
    { href: "/profile", label: "我的", icon: "person" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1a0c11]/95 backdrop-blur-md border-t-2 border-gray-100 dark:border-white/10 z-[100] px-6 py-4 pb-8 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex w-full max-w-lg justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all group ${
                isActive ? "text-[#f4257b]" : "text-[#8a6072] hover:text-[#f4257b]"
              }`}
            >
              <div className={`${isActive ? "bg-[#f4257b]/10 rounded-full px-4 py-1 mb-0.5" : "group-hover:-translate-y-1 transition-transform"}`}>
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
