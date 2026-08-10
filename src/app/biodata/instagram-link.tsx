"use client";

export function InstagramLink() {
  const handleClick = () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "instagram_click" }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <a
      href="https://instagram.com/dax_24_12"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-bio-accent px-7 py-3.5 text-sm font-semibold text-bio-accent-ink transition duration-150 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bio-accent"
    >
      <InstagramIcon />
      @dax_24_12
    </a>
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
