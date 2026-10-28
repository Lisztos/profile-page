"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollHomeTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
