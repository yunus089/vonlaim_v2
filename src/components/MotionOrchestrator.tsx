"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const root = document.documentElement;
    root.classList.add("motion-ready");

    const motionTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".hero h1, .hero .lead, .hero-cta, .chip, .hero-lab, .kinetic-band, .signal-panel, .authority-reel, .authority-fact, .reel-stage, .section-head, .card, .proof-card, .industry-pill, .quality-gate, .faq-item, .cta-band"
      )
    );

    motionTargets.forEach((target, index) => {
      target.classList.add("motion-in");
      target.style.setProperty("--stagger", `${Math.min(index * 35, 420)}ms`);
    });

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );

      motionTargets.forEach((target) => observer?.observe(target));
    } else {
      motionTargets.forEach((target) => target.classList.add("is-visible"));
    }

    const finePointer = window.matchMedia("(pointer: fine) and (min-width: 981px)");
    let pointerFrame = 0;
    const handlePointer = (event: PointerEvent) => {
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        pointerFrame = 0;
      });
    };

    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        root.style.setProperty("--scroll-progress", String(progress));
        scrollFrame = 0;
      });
    };

    const lab = document.querySelector<HTMLElement>(".lab-canvas");
    let labRect: DOMRect | null = null;
    let labFrame = 0;
    const handleLabPointer = (event: PointerEvent) => {
      if (!lab) return;
      if (!labRect) labRect = lab.getBoundingClientRect();
      if (labFrame) return;
      labFrame = window.requestAnimationFrame(() => {
        if (!lab || !labRect) return;
        const x = (event.clientX - labRect.left) / labRect.width - 0.5;
        const y = (event.clientY - labRect.top) / labRect.height - 0.5;
        lab.style.setProperty("--tilt-x", `${x * 5}deg`);
        lab.style.setProperty("--tilt-y", `${y * -5}deg`);
        labFrame = 0;
      });
    };
    const resetLabTilt = () => {
      labRect = null;
      lab?.style.setProperty("--tilt-x", "0deg");
      lab?.style.setProperty("--tilt-y", "0deg");
    };

    const magneticItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );

    const handleMagneticMove = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      element.style.setProperty("--mx", `${x}px`);
      element.style.setProperty("--my", `${y}px`);
    };

    const resetMagnetic = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    };

    if (finePointer.matches) {
      window.addEventListener("pointermove", handlePointer, { passive: true });
      lab?.addEventListener("pointermove", handleLabPointer, { passive: true });
      lab?.addEventListener("pointerleave", resetLabTilt);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    magneticItems.forEach((element) => {
      element.addEventListener("pointermove", handleMagneticMove, { passive: true });
      element.addEventListener("pointerleave", resetMagnetic);
    });
    handleScroll();

    return () => {
      observer?.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      lab?.removeEventListener("pointermove", handleLabPointer);
      lab?.removeEventListener("pointerleave", resetLabTilt);
      magneticItems.forEach((element) => {
        element.removeEventListener("pointermove", handleMagneticMove);
        element.removeEventListener("pointerleave", resetMagnetic);
      });
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (labFrame) window.cancelAnimationFrame(labFrame);
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="motion-crosshair" aria-hidden="true" />
    </>
  );
}
