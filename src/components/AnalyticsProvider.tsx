"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type ConsentState = {
  analytics: boolean;
};

const consentKey = "vonlaim-consent-v1";
const sessionKey = "vonlaim-analytics-session-v1";

function getConsent(): ConsentState {
  try {
    const raw = window.localStorage.getItem(consentKey);
    return raw ? JSON.parse(raw) : { analytics: false };
  } catch {
    return { analytics: false };
  }
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(sessionKey);
  if (existing) return existing;
  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(sessionKey, next);
  return next;
}

function safeText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, 240);
}

function sendEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  if (!getConsent().analytics) return;

  const body = JSON.stringify({
    event_name: eventName,
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer,
    session_id: getSessionId(),
    metadata,
    analytics_consent: true
  });

  if ("sendBeacon" in navigator) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => undefined);
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");
  const firstInteraction = useRef(false);
  const scrollMarks = useRef<Set<number>>(new Set());
  const lastScrollCheck = useRef(0);

  useEffect(() => {
    if (isAdminPath) return;
    scrollMarks.current = new Set();
    sendEvent("page_view", {
      title: document.title,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      reduced_motion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }, [isAdminPath, pathname]);

  useEffect(() => {
    if (isAdminPath) return;

    const onConsent = () => {
      if (getConsent().analytics) {
        sendEvent("page_view", {
          title: document.title,
          consent_refresh: true
        });
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest("a,button") as HTMLAnchorElement | HTMLButtonElement | null;
      if (!element) return;
      const href = element instanceof HTMLAnchorElement ? element.href : "";
      sendEvent("click", {
        label: safeText(element.textContent),
        href,
        type: element.tagName.toLowerCase()
      });
    };

    const onFocusIn = (event: FocusEvent) => {
      if (firstInteraction.current) return;
      const target = event.target as HTMLElement | null;
      if (!target?.closest("form")) return;
      firstInteraction.current = true;
      sendEvent("form_start", {
        form: safeText(target.closest("form")?.getAttribute("action") || "contact")
      });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      sendEvent("form_submit", {
        form: safeText(form.getAttribute("action") || "contact")
      });
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollCheck.current < 250) return;
      lastScrollCheck.current = now;

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;

      const depth = Math.round((window.scrollY / documentHeight) * 100);
      for (const mark of [25, 50, 75, 90]) {
        if (depth >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          sendEvent("scroll_depth", {
            depth: mark,
            title: document.title
          });
        }
      }
    };

    window.addEventListener("vonlaim-consent-updated", onConsent);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("submit", onSubmit);
    return () => {
      window.removeEventListener("vonlaim-consent-updated", onConsent);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("submit", onSubmit);
    };
  }, [isAdminPath]);

  return null;
}
