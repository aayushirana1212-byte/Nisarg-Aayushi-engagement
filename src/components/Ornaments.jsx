// Small reusable golden decorations (inline SVG, no images needed).

export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-line" />
      <svg className="divider-gem" viewBox="0 0 24 24" width="18" height="18">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 7 L17 12 L12 17 L7 12 Z" fill="currentColor" />
      </svg>
      <span className="divider-line" />
    </div>
  );
}

function CornerSvg() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path d="M3 77 V3 H77" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 77 V12 H77" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path
        d="M12 12 C26 12 30 26 20 30 C12 33 8 24 14 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <circle cx="40" cy="3" r="1.8" fill="currentColor" />
      <circle cx="3" cy="40" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Corners() {
  return (
    <>
      <span className="corner corner-tl"><CornerSvg /></span>
      <span className="corner corner-tr"><CornerSvg /></span>
      <span className="corner corner-bl"><CornerSvg /></span>
      <span className="corner corner-br"><CornerSvg /></span>
    </>
  );
}

export function PalaceSilhouette({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g fill="#d6b15c" fillOpacity="0.13" stroke="#d6b15c" strokeOpacity="0.45" strokeWidth="1.2">
        {/* centre palace */}
        <rect x="480" y="100" width="240" height="100" />
        <path d="M500 100 C500 40 560 20 600 20 C640 20 700 40 700 100 Z" />
        <rect x="597" y="0" width="6" height="22" />
        <path d="M570 200 V150 a30 30 0 0 1 60 0 V200" fill="none" />
        <path d="M512 200 V150 a14 14 0 0 1 28 0 V200" fill="none" />
        <path d="M660 200 V150 a14 14 0 0 1 28 0 V200" fill="none" />
        {/* side towers */}
        <rect x="380" y="125" width="62" height="75" />
        <path d="M380 125 C380 92 400 80 411 80 C422 80 442 92 442 125 Z" />
        <rect x="408" y="62" width="6" height="20" />
        <rect x="758" y="125" width="62" height="75" />
        <path d="M758 125 C758 92 778 80 789 80 C800 80 820 92 820 125 Z" />
        <rect x="786" y="62" width="6" height="20" />
        {/* outer pavilions */}
        <rect x="250" y="155" width="46" height="45" />
        <path d="M250 155 C250 134 262 126 273 126 C284 126 296 134 296 155 Z" />
        <rect x="904" y="155" width="46" height="45" />
        <path d="M904 155 C904 134 916 126 927 126 C938 126 950 134 950 155 Z" />
        {/* connecting walls */}
        <rect x="296" y="172" width="84" height="28" />
        <rect x="442" y="160" width="38" height="40" />
        <rect x="720" y="160" width="38" height="40" />
        <rect x="820" y="172" width="84" height="28" />
        <rect x="0" y="186" width="250" height="14" />
        <rect x="950" y="186" width="250" height="14" />
      </g>
    </svg>
  );
}
