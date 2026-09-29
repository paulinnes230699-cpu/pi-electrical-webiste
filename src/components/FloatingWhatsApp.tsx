import { SOCIAL } from "@/data/social";
import TrackedLink from "./TrackedLink";
import { directWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <nav
      aria-label="Quick contact and social profiles"
      className="fixed z-[60] flex flex-col items-center gap-2 [--chat-gap:1rem] lg:[--chat-gap:1.5rem]"
      style={{
        bottom: "calc(max(var(--mobile-bar-h, 0px), env(safe-area-inset-bottom, 0px)) + var(--chat-gap))",
        right: "calc(env(safe-area-inset-right, 0px) + var(--chat-gap))",
      }}
    >
      <TrackedLink
        href={SOCIAL.facebook.href}
        event="social_clicked"
        location="floating_social"
        action="facebook"
        aria-label="PI Electrical on Facebook (opens in a new tab)"
        title="Follow PI Electrical on Facebook"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-colors hover:bg-[#1261c7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1877F2]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M13.5 22v-9h3l.5-4h-3.5V7c0-1.15.35-2 2-2H17V1.4A20 20 0 0 0 14.4 1C11.7 1 10 2.65 10 5.7V9H7v4h3v9z" />
        </svg>
      </TrackedLink>
      <TrackedLink
        href={SOCIAL.instagram.href}
        event="instagram_clicked"
        location="floating_social"
        action="instagram"
        aria-label="PI Electrical on Instagram (opens in a new tab)"
        title="Follow PI Electrical on Instagram"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#7c38ab] text-white shadow-lg hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2743]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </TrackedLink>
    <TrackedLink
      href={directWhatsAppUrl()}
      event="whatsapp_quote_clicked"
      location="floating_whatsapp"
      action="open_chat"
      aria-label="Chat with PI Electrical on WhatsApp (opens in a new tab)"
      title="Chat with Paul on WhatsApp"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#128C4A] text-white shadow-lg ring-1 ring-black/10 transition-colors hover:bg-[#0d703b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128C4A]"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.45 0 .09 5.36.09 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.95 11.95 0 0 0 5.77 1.47h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.47-8.4ZM12.04 21.8a9.91 9.91 0 0 1-5.05-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.24c0-5.48 4.45-9.93 9.94-9.93a9.87 9.87 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.9 7.02c0 5.48-4.45 9.94-9.96 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.71.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </TrackedLink>
    </nav>
  );
}
