type IconProps = { className?: string };

export function HomeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12v9h18V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TradeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M7 16V4m0 0L3 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CommentIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function StarIcon({ className = "w-5 h-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function TrophyIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M6 9H4a2 2 0 01-2-2V5h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9h2a2 2 0 002-2V5h-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 2h12v9a6 6 0 01-12 0V2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22v-3M15 22v-3M7 22h10" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1c1917" />
      <circle cx="16" cy="14" r="5.5" fill="white" opacity="0.15" />
      <circle cx="16" cy="14" r="3.5" fill="white" opacity="0.9" />
      <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="white" opacity="0.5" />
    </svg>
  );
}

export function SealPlaceholder({ series, className = "w-full h-full" }: { series: string; className?: string }) {
  const configs: Record<string, { bg: string; c1: string; c2: string; c3: string }> = {
    "ボンボンドロップシール": { bg: "#fdf8f7", c1: "#e8d5d1", c2: "#d4b0aa", c3: "#bc8880" },
    "うるチュルポップシール": { bg: "#f7f7fd", c1: "#ddd8f0", c2: "#b8aee0", c3: "#8b7fc8" },
    "プチドロップシール":     { bg: "#fdfbf0", c1: "#ede8c0", c2: "#d4c878", c3: "#b8aa44" },
    "マシュマロシール":       { bg: "#f5faf5", c1: "#c8e8c8", c2: "#98cc98", c3: "#68aa68" },
    "ウォーターシール":       { bg: "#f0f8fd", c1: "#b8ddf0", c2: "#78bce0", c3: "#3898c8" },
    "タイルシール":           { bg: "#f7f7f7", c1: "#e0e0e0", c2: "#c0c0c0", c3: "#a0a0a0" },
    "default":               { bg: "#f7f7f7", c1: "#e0e0e0", c2: "#c0c0c0", c3: "#a0a0a0" },
  };
  const c = configs[series] ?? configs["default"];

  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" fill={c.bg} />
      <circle cx="60" cy="58" r="30" fill={c.c1} />
      <circle cx="60" cy="58" r="20" fill={c.c2} />
      <circle cx="60" cy="58" r="11" fill={c.c3} />
      <circle cx="52" cy="50" r="5" fill="white" opacity="0.4" />
    </svg>
  );
}
