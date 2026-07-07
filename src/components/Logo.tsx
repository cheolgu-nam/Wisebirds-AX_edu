/** Brand-faithful approximation of the Wisebirds wordmark + origami-bird mark. */
export function WisebirdsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* origami bird mark: yellow + blue triangles */}
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        aria-hidden
        className="translate-y-[1px]"
      >
        <path d="M11 2 L20 8 L13 8 Z" fill="#F5C518" />
        <path d="M11 2 L2 8 L11 8 Z" fill="#3E8FD6" />
        <path d="M4 9 L18 9 L11 15 Z" fill="#3E8FD6" opacity="0.92" />
      </svg>
      <span className="text-[19px] font-semibold tracking-tight text-brand-ink">
        wisebirds
      </span>
    </div>
  );
}
