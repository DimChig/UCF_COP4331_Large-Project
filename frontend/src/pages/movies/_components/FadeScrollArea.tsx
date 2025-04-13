import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import clsx from "clsx";
import React, { useRef, useState } from "react";

export default function FadeScrollArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const [atStart, setAtStart] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const containerEl = scrollRef.current;
    if (!containerEl) return;

    const firstChild = containerEl.firstElementChild as HTMLElement | null;
    if (!firstChild) {
      return;
    }

    const transform = window.getComputedStyle(firstChild).transform;
    if (transform.includes("matrix")) {
      setAtStart(transform === "matrix(1, 0, 0, 1, 0, 0)"); // smart way of checking if x == 0
    }
  };

  return (
    <div className="relative w-full">
      <ScrollArea
        className="w-full whitespace-nowrap"
        onMouseMove={handleScroll}
        type="always"
      >
        <div className="flex w-full pb-6 gap-4 h-fit">{children}</div>
        <ScrollBar ref={scrollRef} orientation="horizontal" />
      </ScrollArea>
      <div
        className={clsx(
          "pointer-events-none absolute top-0 right-0 h-full w-12 transition-opacity duration-500",
          {
            "opacity-100": atStart,
            "opacity-0": !atStart,
          }
        )}
        style={{ background: "linear-gradient(to left, white, transparent)" }}
      />
    </div>
  );
}
