import Link from "next/link";
import Image from "next/image";
import Wordmark from "./Wordmark";
import BrandLink from "./BrandLink";
import Stars from "./Stars";
import TrackedLink from "./TrackedLink";
import { BUSINESS } from "@/data/business";
import { NAV_LINKS } from "@/data/navigation";
import { AREA_LIST } from "@/data/areas";
import { MEMBERSHIP } from "@/data/membership";

/**
 * Site footer. Server component - only the four tracked links hydrate, via
 * <TrackedLink> islands.
 *
 * Every contact value is read from data/business.ts, including the address
 * lines. The previous version hardcoded "Bonnyrigg" and the postcode here
 * while reading the correct values from config three lines above, so editing
 * the address in one place silently left a stale value in the footer.
 */

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="on-dark bg-black text-white">
      <div className="shell pb-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <BrandLink>
              <Wordmark tone="dark" size="lg" />
            </BrandLink>
            <div className="mt-5">
              <Stars rating={5} tone="dark" />
            </div>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-dark">
              Domestic and commercial electrical work for homeowners, builders
              and businesses across {AREA_LIST.slice(0, 4).join(", ")} and
              surrounding areas.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-white">Explore</h2>
            <ul className="mt-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/maintenance-membership"
                  className="inline-flex min-h-11 items-center text-sm text-white/85 transition-colors hover:text-white"
                >
                  Maintenance Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-11 items-center text-sm text-white/85 transition-colors hover:text-white"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white">Contact</h2>
            <address className="mt-5 flex flex-col gap-1 not-italic">
              <TrackedLink
                event="phone_clicked"
                location="footer"
                action="footer_phone"
                href={BUSINESS.phone.href}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-white transition-colors hover:text-white"
              >
                {BUSINESS.phone.display}
              </TrackedLink>
              <a
                href={BUSINESS.email.href}
                className="inline-flex min-h-11 items-center break-all text-sm text-white/85 transition-colors hover:text-white"
              >
                {BUSINESS.email.display}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.town}, {BUSINESS.address.postcode}
                <br />
                {BUSINESS.address.region}, {BUSINESS.address.country}
              </p>
            </address>
            <p className="mt-3 max-w-[30ch] text-xs leading-relaxed text-muted-dark">
              {BUSINESS.name} is run by {BUSINESS.owner}. Working on site? Paul
              may not always be able to answer immediately - please leave a
              voicemail and he&apos;ll get back to you.
            </p>
          </div>

          {/* Coverage */}
          <div className="lg:col-span-2">
            <h2 className="eyebrow text-white">Coverage</h2>
            <ul className="mt-5 flex flex-col gap-1.5">
              {["Edinburgh", "Lothians", "Fife", "Scotland"].map((area) => (
                <li key={area} className="text-sm text-white/85">
                  {area}
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-8 text-white">Follow</h2>
            <ul className="mt-4 flex gap-3">
              <li>
                <TrackedLink
                  event="social_clicked"
                  location="footer"
                  action="footer_facebook"
                  href="https://www.facebook.com/share/1F7XC3RE5D/"
                  aria-label="Facebook"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bg-[#1877F2] text-white hover:bg-[#1261c7]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M13.5 22v-9h3l.5-4h-3.5V7c0-1.15.35-2 2-2H17V1.4A20 20 0 0 0 14.4 1C11.7 1 10 2.65 10 5.7V9H7v4h3v9z" />
                  </svg>
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  event="social_clicked"
                  location="footer"
                  action="footer_reviews"
                  href="https://www.mybuilder.com/profile/pi-electrical/reviews"
                  aria-label="PI Electrical reviews on MyBuilder"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bg-white hover:bg-neutral-200"
                >
                  <Image src="/images/mybuilder-icon.ico" alt="" width={28} height={28} unoptimized className="h-7 w-7 object-contain" />
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  event="instagram_clicked"
                  location="footer"
                  action="footer_instagram"
                  href="https://www.instagram.com/pi_electrical_/"
                  aria-label="Instagram"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#7c38ab] text-white hover:brightness-110"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Membership strip - a real product, so it gets a permanent home */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/85">
            <span className="font-semibold text-white">
              {MEMBERSHIP.priceLine}
            </span>{" "}
            Electrical Maintenance Membership - labour cover for eligible
            electrical faults and call-outs.
          </p>
          <Link
            href="/maintenance-membership"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-white hover:text-white-strong"
          >
            See what&apos;s included →
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {YEAR} {BUSINESS.name}. All rights reserved.
          </p>
          <p>
            {BUSINESS.address.town} · {BUSINESS.address.postcode} ·{" "}
            {BUSINESS.address.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
