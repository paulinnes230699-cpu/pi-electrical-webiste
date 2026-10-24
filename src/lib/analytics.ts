import { sendGAEvent } from "@next/third-parties/google";

/**
 * ============================================================================
 * ANALYTICS
 * ----------------------------------------------------------------------------
 * Google Analytics 4 (tag G-5SXH1G36RR) is loaded via `@next/third-parties`
 * in the root layout, with the client's explicit instruction. Its gtag.js
 * receives events through sendGAEvent using the Google tag event command.
 * Plain dataLayer objects require GTM and are not sufficient for this setup.
 * The pi:track CustomEvent remains available to local listeners.
 *
 * PRIVACY - IMPORTANT
 * -------------------
 * `track()` accepts only a fixed event name and a small allowlist of
 * non-identifying context. There is deliberately no way to pass form
 * content. Job descriptions, postcodes, names, phone numbers and email
 * addresses are NEVER sent to analytics - see the type signature, which
 * makes that a compile error rather than a code-review catch.
 * ============================================================================
 */

export type AnalyticsEvent =
  | "quote_cta_clicked"
  | "whatsapp_quote_clicked"
  | "phone_clicked"
  | "service_viewed"
  | "project_viewed"
  | "instagram_clicked"
  | "social_clicked"
  | "membership_viewed"
  | "membership_signup_clicked";

/**
 * Non-identifying context only. No free-form string, so customer data cannot
 * be passed by accident.
 */
export type AnalyticsContext = {
  /** Which surface triggered it, e.g. "hero", "mobile_bar", "footer". */
  location: "floating_social" | "floating_whatsapp" | "hero" | "quote_panel" | "header" | "footer" | "mobile_bar" | "services" | "projects" | "emergency" | "membership" | "final_cta" | "services_page" | "projects_page" | "home" | "not_found";
  /** Which button or link, e.g. "primary", "secondary", "call", "whatsapp". */
  action: string;
  /** A service slug from data/services.ts, when relevant. Never free text. */
  service?: string;
};

function push(event: AnalyticsEvent, context: AnalyticsContext) {
  if (typeof window === "undefined") return;

  const payload = { event, ...context };

  const parameters = {
    location: context.location,
    action: context.action,
    ...(context.service ? { service: context.service } : {}),
  };
  sendGAEvent("event", event, parameters);

  window.dispatchEvent(new CustomEvent("pi:track", { detail: payload }));
}

export function track(event: AnalyticsEvent, context: AnalyticsContext) {
  try {
    push(event, context);
  } catch {
    // Analytics must never break the page or a conversion path.
  }
}
