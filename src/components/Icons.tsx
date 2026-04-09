type IconProps = { className?: string };

export function HomeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12v9h18V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TradeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 16V4m0 0L3 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CommentIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function StarIcon({ className = "w-5 h-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function TrophyIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9H4a2 2 0 01-2-2V5h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9h2a2 2 0 002-2V5h-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 2h12v9a6 6 0 01-12 0V2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22v-3" strokeLinecap="round" />
      <path d="M15 22v-3" strokeLinecap="round" />
      <path d="M7 22h10" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#ec4899" />
      <circle cx="16" cy="13" r="6" fill="white" opacity="0.9" />
      <circle cx="16" cy="13" r="3.5" fill="#ec4899" />
      <rect x="10" y="21" width="12" height="2.5" rx="1.25" fill="white" opacity="0.8" />
    </svg>
  );
}

// シールプレースホルダー（シリーズ別カラー）
export function SealPlaceholder({ series, className = "w-full h-full" }: { series: string; className?: string }) {
  const configs: Record<string, { bg: string; accent: string; shape: string }> = {
    "ボンボンドロップシール": { bg: "#fce7f3", accent: "#ec4899", shape: "circle" },
    "うるチュルポップシール": { bg: "#ede9fe", accent: "#8b5cf6", shape: "drop" },
    "プチドロップシール": { bg: "#fef3c7", accent: "#f59e0b", shape: "star" },
    "マシュマロシール": { bg: "#f0fdf4", accent: "#22c55e", shape: "round" },
    "ウォーターシール": { bg: "#e0f2fe", accent: "#0ea5e9", shape: "wave" },
    "default": { bg: "#f1f5f9", accent: "#94a3b8", shape: "circle" },
  };
  const c = configs[series] ?? configs["default"];

  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" fill={c.bg} />
      {c.shape === "circle" && (
        <>
          <circle cx="60" cy="55" r="28" fill={c.accent} opacity="0.2" />
          <circle cx="60" cy="55" r="18" fill={c.accent} opacity="0.5" />
          <circle cx="60" cy="55" r="10" fill={c.accent} opacity="0.9" />
          <circle cx="52" cy="47" r="4" fill="white" opacity="0.6" />
        </>
      )}
      {c.shape === "drop" && (
        <>
          <ellipse cx="60" cy="58" rx="22" ry="26" fill={c.accent} opacity="0.3" />
          <ellipse cx="60" cy="58" rx="14" ry="17" fill={c.accent} opacity="0.6" />
          <ellipse cx="54" cy="50" rx="5" ry="6" fill="white" opacity="0.5" />
        </>
      )}
      {c.shape === "star" && (
        <>
          <polygon points="60,28 67,50 90,50 72,63 79,85 60,72 41,85 48,63 30,50 53,50" fill={c.accent} opacity="0.25" />
          <polygon points="60,36 65,52 82,52 68,61 73,77 60,68 47,77 52,61 38,52 55,52" fill={c.accent} opacity="0.7" />
        </>
      )}
      {c.shape === "round" && (
        <>
          <rect x="32" y="32" width="56" height="56" rx="16" fill={c.accent} opacity="0.2" />
          <rect x="40" y="40" width="40" height="40" rx="12" fill={c.accent} opacity="0.5" />
          <rect x="48" y="48" width="24" height="24" rx="8" fill={c.accent} opacity="0.9" />
          <circle cx="52" cy="52" r="4" fill="white" opacity="0.5" />
        </>
      )}
      {c.shape === "wave" && (
        <>
          <ellipse cx="60" cy="60" rx="26" ry="26" fill={c.accent} opacity="0.15" />
          <ellipse cx="60" cy="60" rx="18" ry="18" fill={c.accent} opacity="0.35" />
          <ellipse cx="60" cy="60" rx="11" ry="11" fill={c.accent} opacity="0.7" />
          <ellipse cx="55" cy="55" rx="4" ry="3" fill="white" opacity="0.6" />
        </>
      )}
    </svg>
  );
}
