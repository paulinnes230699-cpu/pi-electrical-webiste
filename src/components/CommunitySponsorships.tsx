import Image from "next/image";
import { SPONSORSHIPS, SPONSORSHIP_PHOTO } from "@/data/sponsorships";
import SectionHeading from "./SectionHeading";

export default function CommunitySponsorships() {
  const photo = SPONSORSHIP_PHOTO;

  return (
    <section aria-labelledby="community-heading" className="border-b border-line bg-warm">
      <div className="shell py-16 sm:py-24">
        <SectionHeading
          id="community-heading"
          eyebrow="In our community"
          title="Proud to support local bowls"
          intro="Based in Bonnyrigg, PI Electrical is proud to sponsor Midlothian Indoor Bowling Club and Bowls Midlothian, supporting local sport in the community we serve."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {SPONSORSHIPS.map((organisation) => (
            <li key={organisation.name} className="flex flex-col rounded-lg border border-line border-t-4 border-t-[#4bb874] bg-white p-6 sm:p-8">
              <Image
                src={organisation.logo}
                alt={`${organisation.name} logo`}
                width={112}
                height={112}
                sizes="(max-width: 639px) 96px, 112px"
                className="mb-6 h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
              <p className="text-xs font-bold uppercase tracking-widest text-[#24663d]">Proud sponsor</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">{organisation.name}</h3>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
                {organisation.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={`${link.label}: ${organisation.name}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-[#24663d] underline decoration-[#4bb874] underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24663d]"
                  >
                    {link.label} <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
        {photo && (
          <figure className="mt-10 overflow-hidden rounded-lg border border-line bg-white">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full"
            />
            <figcaption className="px-6 py-4 text-sm leading-relaxed text-muted">{photo.caption}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
