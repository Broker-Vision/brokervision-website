"use client";

import { useEffect, useRef } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  disabled?: boolean;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onBrokerVisionTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Active widget id for safe reset after submit (must survive disabled=busy). */
let activeWidgetId: string | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("TURNSTILE_SCRIPT_FAILED"));
    document.head.appendChild(script);
  });
}

export function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  onError,
  disabled = false,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onToken, onExpire, onError });

  useEffect(() => {
    callbacksRef.current = { onToken, onExpire, onError };
  }, [onToken, onExpire, onError]);

  // Do NOT depend on `disabled`: toggling busy must not remove the widget.
  // Removing it made resetTurnstile() throw after a successful API response,
  // which the form catch mis-reported as NETWORK.
  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) {
          const previousId = widgetIdRef.current;
          window.turnstile.remove(previousId);
          if (activeWidgetId === previousId) activeWidgetId = null;
          widgetIdRef.current = null;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => callbacksRef.current.onToken(token),
          "expired-callback": () => callbacksRef.current.onExpire?.(),
          "error-callback": () => callbacksRef.current.onError?.(),
        });
        activeWidgetId = widgetIdRef.current;
      })
      .catch(() => {
        callbacksRef.current.onError?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore teardown errors
        }
        if (activeWidgetId === widgetIdRef.current) activeWidgetId = null;
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return (
    <div
      ref={containerRef}
      className="cf-turnstile"
      aria-disabled={disabled}
      style={{
        pointerEvents: disabled ? "none" : undefined,
        opacity: disabled ? 0.65 : undefined,
      }}
    />
  );
}

/** Safe reset – never throws (widget may already be gone after unmount). */
export function resetTurnstile() {
  if (typeof window === "undefined" || !window.turnstile) return;
  try {
    if (activeWidgetId) {
      window.turnstile.reset(activeWidgetId);
    } else {
      window.turnstile.reset();
    }
  } catch {
    // Cloudflare throws if the widget was already removed; ignore.
  }
}
