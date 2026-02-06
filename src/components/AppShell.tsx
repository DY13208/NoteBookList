"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const HIDE_NAV_PREFIXES = ["/login", "/signup", "/trophy-room/share"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = HIDE_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const useVisualBottom = pathname === "/";
  const [vvBottom, setVvBottom] = useState(0);
  const navOffset = hideNav ? "0px" : useVisualBottom ? `${vvBottom}px` : "0px";
  const navSpace = hideNav ? "0px" : `calc(88px + 0.75rem + ${navOffset})`;

  useEffect(() => {
    if (!useVisualBottom || hideNav) {
      setVvBottom(0);
      return;
    }

    const updateVisualBottom = () => {
      const vv = window.visualViewport;
      if (!vv) {
        setVvBottom(0);
        return;
      }
      const bottomInset = Math.max(0, Math.round(window.innerHeight - (vv.height + vv.offsetTop)));
      setVvBottom(bottomInset);
    };

    updateVisualBottom();
    window.addEventListener("resize", updateVisualBottom);
    window.visualViewport?.addEventListener("resize", updateVisualBottom);
    window.visualViewport?.addEventListener("scroll", updateVisualBottom);

    return () => {
      window.removeEventListener("resize", updateVisualBottom);
      window.visualViewport?.removeEventListener("resize", updateVisualBottom);
      window.visualViewport?.removeEventListener("scroll", updateVisualBottom);
    };
  }, [useVisualBottom, hideNav]);

  return (
    <div
      className="min-h-screen pb-nav-safe"
      style={
        {
          "--bottom-nav-space": navSpace,
          "--nav-offset": navOffset,
        } as React.CSSProperties
      }
    >
      {children}
      {!hideNav && <BottomNav pathname={pathname} />}
    </div>
  );
}
