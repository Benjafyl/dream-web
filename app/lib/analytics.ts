"use client";

type Consent = {
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function getConsent(): Consent {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false };
  }

  try {
    const value = window.localStorage.getItem("dreamweb-consent");
    return value
      ? JSON.parse(value)
      : { analytics: false, marketing: false };
  } catch {
    return { analytics: false, marketing: false };
  }
}

export function trackEvent(name: string, data: Record<string, string> = {}) {
  if (typeof window === "undefined" || !getConsent().analytics) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...data });
}
