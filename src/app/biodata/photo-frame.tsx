import Image from "next/image";

type PhotoFrameProps = {
  alt: string;
  aspect?: "portrait" | "square";
  label?: string;
  src?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectClass: Record<NonNullable<PhotoFrameProps["aspect"]>, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

/**
 * Renders a real photo once `src` is supplied; otherwise renders a sized,
 * labelled placeholder. To add a real photo: drop the file in
 * `public/biodata/`, then pass `src="/biodata/<file>.jpg"` from page.tsx —
 * nothing else needs to change.
 */
export function PhotoFrame({
  alt,
  aspect = "portrait",
  label = "Add photo",
  src,
  priority = false,
  sizes = "(min-width: 768px) 480px, 90vw",
}: PhotoFrameProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[28px] bg-bio-surface ${aspectClass[aspect]}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-bio-divider text-bio-ink-muted">
          <CameraIcon />
          <span className="text-sm tracking-wide">{label}</span>
        </div>
      )}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}
