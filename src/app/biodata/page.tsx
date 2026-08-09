import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PhotoFrame } from "./photo-frame";
import { Reveal } from "./reveal";

export const metadata: Metadata = {
  title: "Dax Rajani",
  description: "Dax Rajani — biodata.",
  robots: { index: false, follow: false },
};

const personalDetails = [
  { label: "Age", value: "24" },
  { label: "Date of Birth", value: "24th December 2001" },
  { label: "Height", value: "173 cm (5'8\")" },
  { label: "Current City", value: "Montreal, Canada" },
  { label: "Gam", value: "Ranuj" },
];

const traits = ["Disciplined", "Curious", "Adventurous", "Focused"];

const familyDetails = [
  { label: "Father", value: "Jognib Patel" },
  { label: "Mother", value: "Jagruti Patel" },
  { label: "Grandparents (Paternal)", value: "Babubhai Patel, Maniben Patel" },
  { label: "Grandfather (Maternal)", value: "Jayantilal Ambalal Patel" },
  { label: "Siblings", value: "1 Sister (Married)" },
];

export default function BiodataPage() {
  return (
    <main className="bg-bio-canvas font-sans text-bio-ink">
      <Hero />
      <About />
      <PersonalDetails />
      <Traits />
      <Education />
      <ImmigrationStatus />
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

/* ---------- sections ---------- */

function Hero() {
  return (
    <Section className="flex min-h-[92svh] flex-col items-center justify-center pt-24 pb-16 sm:pt-16">
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
          <PhotoFrame alt="Dax Rajani" aspect="portrait" label="Add photo" priority />
        </Reveal>
      </Container>
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
            Hello, my name is Dax Rajani. I love to travel and explore new
            places, try different cuisines, and go hiking and trekking. I am
            also a competitive powerlifter and stay active with regular
            workouts. Currently exploring opportunities in embedded firmware
            roles across Canada.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function PersonalDetails() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>Personal Details</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {personalDetails.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 60}>
              <div className="flex items-baseline justify-between gap-6 border-b border-bio-divider py-6 first:pt-0 last:border-b-0">
                <span className="text-sm text-bio-ink-muted">{item.label}</span>
                <span className="text-lg font-semibold text-right">{item.value}</span>
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

function ImmigrationStatus() {
  return (
    <Section className="bg-bio-canvas-alt">
      <Container className="text-center">
        <Reveal>
          <Eyebrow>Immigration Status</Eyebrow>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mt-6 text-3xl font-semibold text-balance">
            Work Permit, Canada
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Family() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>Family</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {familyDetails.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 60}>
              <div className="flex flex-col gap-1 border-b border-bio-divider py-6 first:pt-0 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-sm text-bio-ink-muted">{item.label}</span>
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
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} delayMs={i * 90}>
              <PhotoFrame alt={`Gallery photo ${n}`} aspect="square" label="Add photo" />
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
          <a
            href="https://instagram.com/dax_24_12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-bio-accent px-6 py-3 text-sm font-semibold text-bio-accent-ink transition-opacity hover:opacity-90"
          >
            <InstagramIcon />
            @dax_24_12
          </a>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="mt-8 text-sm text-bio-ink-muted">
            Thank you for taking the time to know me.
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
