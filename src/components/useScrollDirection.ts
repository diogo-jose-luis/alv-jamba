"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(offset = 120) {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return pinned;
}
