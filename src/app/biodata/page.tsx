import type { Metadata } from "next";
import type { ReactNode } from "react";
import { InstagramLink } from "./instagram-link";
import { PhotoFrame } from "./photo-frame";
import { Reveal } from "./reveal";
import { ScrollProgress } from "./scroll-progress";
import { TrackView } from "./track-view";

export const metadata: Metadata = {
  title: "Dax Rajani",
  description: "Dax Rajani — biodata.",
  robots: { index: false, follow: false },
};

const personalDetails = [
  { label: "Age", value: "24", Icon: CalendarIcon },
  { label: "Date of Birth", value: "24th December 2001", Icon: GiftIcon },
  { label: "Height", value: "173 cm (5'8\")", Icon: RulerIcon },
  { label: "Current City", value: "Montreal, Canada", Icon: MapPinIcon },
  { label: "Gam", value: "Ranuj", Icon: HomeIcon },
  { label: "Immigration Status", value: "Work Permit, Canada", Icon: IdCardIcon },
];

const traits = ["Disciplined", "Curious", "Adventurous", "Focused"];

const interests = [
  { label: "Road Trips", Icon: CarIcon },
  { label: "Adventure Sports", Icon: CompassIcon },
  { label: "Hiking & Trekking", Icon: MountainIcon },
  { label: "Global Cuisine", Icon: UtensilsIcon },
  { label: "Powerlifting", Icon: DumbbellIcon },
];

const familyDetails = [
  { label: "Father", value: "Jognib Patel", Icon: PersonIcon },
  { label: "Mother", value: "Jagruti Patel", Icon: PersonIcon },
  { label: "Grandparents (Paternal)", value: "Babubhai Patel, Maniben Patel", Icon: PeopleIcon },
  { label: "Grandfather (Maternal)", value: "Jayantilal Ambalal Patel", Icon: PersonIcon },
  { label: "Siblings", value: "1 Sister (Married)", Icon: PeopleIcon },
];

const galleryPhotos = [
  { id: 1, src: "/biodata/gallery-1.jpg" },
  { id: 2, src: "/biodata/gallery-2.jpg" },
  { id: 3, src: "/biodata/gallery-3.jpg" },
];

export default function BiodataPage() {
  return (
    <main className="bg-bio-canvas font-sans text-bio-ink">
      <TrackView />
      <ScrollProgress />
      <Hero />
      <About />
      <PersonalDetails />
      <Traits />
      <Interests />
      <Education />
      <Family />
      <Gallery />
      <Footer />
    </main>
  );
}

/* ---------- shared layout primitives ---------- */

function Container({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 ${wide ? "max-w-[860px]" : "max-w-[640px]"} ${className}`}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 lg:py-[120px] ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] text-bio-accent uppercase">
      {children}
    </p>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bio-surface text-bio-accent">
      {children}
    </span>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <Section className="relative flex min-h-[92svh] flex-col items-center justify-center pt-24 pb-16 sm:pt-16">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <h1 className="text-hero font-semibold tracking-tight text-balance">
            Dax Rajani
          </h1>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="mt-6 text-lg text-bio-ink-muted text-balance">
            Steady, curious, and building a life worth sharing.
          </p>
        </Reveal>
        <Reveal delayMs={200} className="mt-16 w-full max-w-[280px] sm:max-w-[320px]">
          <PhotoFrame
            alt="Dax Rajani"
            aspect="portrait"
            src="/biodata/hero.jpg"
            priority
            elevated
          />
        </Reveal>
      </Container>
      <Reveal
        delayMs={400}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-bio-ink-muted/70">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
            Scroll
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </Reveal>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <Container className="text-center">
        <Reveal>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mt-6 text-xl leading-snug text-balance">
            Curiosity runs deep in me, new places, new food, new
            experiences. Powerlifting keeps that same energy disciplined
            and focused. Now, it&apos;s driving my search for the right
            embedded firmware role in Canada.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function PersonalDetails() {
  return (
    <Section className="bg-bio-canvas-alt">
      <Container>
        <Reveal>
          <Eyebrow>Personal Details</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {personalDetails.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 60}>
              <div className="flex flex-col gap-2 border-b border-bio-divider py-6 first:pt-0 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-center gap-3">
                  <IconBadge>
                    <item.Icon />
                  </IconBadge>
                  <span className="text-sm text-bio-ink-muted">{item.label}</span>
                </div>
                <span className="pl-12 text-lg font-semibold sm:pl-0 sm:text-right">
                  {item.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Traits() {
  return (
    <Section>
      <Container className="text-center">
        <Reveal>
          <Eyebrow>Personal Traits</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {traits.map((trait, i) => (
            <Reveal key={trait} delayMs={i * 70}>
              <span className="inline-block rounded-full border border-bio-divider bg-bio-surface px-7 py-3 text-sm tracking-wide">
                {trait}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Interests() {
  return (
    <Section className="bg-bio-canvas-alt">
      <Container className="text-center">
        <Reveal>
          <Eyebrow>Interests</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {interests.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 70}>
              <span className="inline-flex items-center gap-2 rounded-full border border-bio-divider bg-bio-canvas px-6 py-3 text-sm tracking-wide">
                <item.Icon className="text-bio-accent" />
                {item.label}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Education() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>Education</Eyebrow>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mt-6 text-2xl font-semibold leading-tight text-balance">
            Master of Engineering, Electrical and Computer Engineering
          </p>
        </Reveal>
        <Reveal delayMs={140}>
          <p className="mt-4 text-base text-bio-ink-muted">
            Concordia University, Montreal — Graduated May 2026
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Family() {
  return (
    <Section className="bg-bio-canvas-alt">
      <Container>
        <Reveal>
          <Eyebrow>Family</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {familyDetails.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 60}>
              <div className="flex flex-col gap-2 border-b border-bio-divider py-6 first:pt-0 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-center gap-3">
                  <IconBadge>
                    <item.Icon />
                  </IconBadge>
                  <span className="text-sm text-bio-ink-muted">{item.label}</span>
                </div>
                <span className="text-lg font-semibold sm:text-right">{item.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Gallery() {
  return (
    <Section>
      <Container wide className="text-center">
        <Reveal>
          <Eyebrow>Gallery</Eyebrow>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {galleryPhotos.map((photo, i) => (
            <Reveal key={photo.id} delayMs={i * 90}>
              <PhotoFrame alt="Gallery photo" aspect="square" src={photo.src} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-bio-canvas-alt py-16 sm:py-24">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <InstagramLink />
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mt-8 text-sm text-bio-ink-muted italic">
            Thank you for taking the time to know me.
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}

/* ---------- detail icons ---------- */

type IconProps = { className?: string };

const iconAttrs = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function GiftIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M3 9h18M12 9v12" />
      <path d="M8 9a2.5 2.5 0 0 1 0-5c1.8 0 3.2 2 4 5" />
      <path d="M16 9a2.5 2.5 0 0 0 0-5c-1.8 0-3.2 2-4 5" />
    </svg>
  );
}

function RulerIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function HomeIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V20a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9.5" />
    </svg>
  );
}

function IdCardIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="1.8" />
      <path d="M5.3 15.8c0-1.6 1.4-2.5 3.2-2.5s3.2.9 3.2 2.5" />
      <path d="M14 9.5h4M14 12.5h4" />
    </svg>
  );
}

function PersonIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.5 20c0-3.7 3-5.7 6.5-5.7s6.5 2 6.5 5.7" />
    </svg>
  );
}

function PeopleIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <circle cx="9" cy="8.3" r="2.5" />
      <circle cx="16" cy="9.3" r="2.1" />
      <path d="M3.7 19c0-2.9 2.5-4.5 5.3-4.5s5.3 1.6 5.3 4.5" />
      <path d="M14.3 14.8c2.2.4 3.8 1.9 3.8 4.2" />
    </svg>
  );
}

function CarIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M4 16l1.5-5a2 2 0 0 1 1.9-1.4h9.2a2 2 0 0 1 1.9 1.4L20 16" />
      <rect x="3" y="16" width="18" height="4" rx="1.5" />
      <circle cx="7.5" cy="20" r="1.3" />
      <circle cx="16.5" cy="20" r="1.3" />
    </svg>
  );
}

function CompassIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2Z" />
    </svg>
  );
}

function UtensilsIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M6.5 3v7a2 2 0 1 1-3.5 0V3M4.7 10v11" />
      <path d="M17 3c-1.8 0-3.2 1.6-3.2 4.2S15.2 11.4 17 11.4V21" />
    </svg>
  );
}

function MountainIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M3 20 9.5 8l4 6.5L16 11l5 9Z" />
    </svg>
  );
}

function DumbbellIcon({ className = "" }: IconProps) {
  return (
    <svg {...iconAttrs} className={className}>
      <path d="M6.5 9v6M17.5 9v6M3 11v2M21 11v2M9 12h6" />
    </svg>
  );
}
