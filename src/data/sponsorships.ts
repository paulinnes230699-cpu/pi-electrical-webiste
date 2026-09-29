export const SPONSORSHIPS = [
  {
    name: "Midlothian Indoor Bowling Club",
    logo: "/images/midlothian-indoor-bowling-club-logo.png",
    links: [{ label: "Visit Facebook", href: "https://www.facebook.com/midlothianindoor/" }],
  },
  {
    name: "Bowls Midlothian",
    logo: "/images/bowls-midlothian-logo.png",
    links: [
      { label: "Visit website", href: "https://bowlsmidlothian.co.uk/" },
      { label: "Visit Facebook", href: "https://www.facebook.com/BMidlothian/" },
    ],
  },
];

export type SponsorshipPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

// When the team photograph arrives, add it to public/images and replace null
// with its /images/... path, descriptive alt text, actual dimensions and caption.
// Suggested caption: New season, new strips—proudly sponsored by PI Electrical.
export const SPONSORSHIP_PHOTO: SponsorshipPhoto | null = null;
