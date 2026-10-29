type IconProps = { className?: string };

/** LinkedIn wordmark — bold lowercase “in” (LinkedIn lockup at icon scale). */
export function LinkedInIcon({
  className = "size-icon-md text-base",
}: IconProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center select-none font-secondary font-extrabold leading-none tracking-[-0.1em] lowercase text-current ${className}`}
    >
      in
    </span>
  );
}

/** Substack mark — official three-stack logo (ink via currentColor). */
export function SubstackIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`size-icon-md shrink-0 -translate-y-px text-current ${className}`}
    >
      <path d="M20.317 3.492H3.683v3.272h16.634V3.492zm0 5.445H3.683v3.271h16.634V8.937zm0 5.444H3.683v8.088l8.317-3.756 8.317 3.756v-8.088z" />
    </svg>
  );
}
