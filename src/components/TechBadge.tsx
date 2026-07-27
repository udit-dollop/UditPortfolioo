/**
 * Lightweight inline tech badges. Brand SVGs are simplified, original
 * monochrome marks adapted for badge use (single currentFill). Falls back to
 * a letter badge when no specific mark is registered.
 */
const PALETTE: Record<string, string> = {
  K: '#7F52FF',
  J: '#E76F00',
  C: '#A8B9CC',
  Jetpack: '#3DDC84',
  XML: '#FF6A00',
  Layers: '#6366F1',
  Play: '#6654F0',
  Link: '#F59E0B',
  MVVM: '#06B6D4',
  MVC: '#8B5CF6',
  Clean: '#10B981',
  Retrofit: '#48B982',
  API: '#0EA5E9',
  JSON: '#A78BFA',
  Postman: '#FF6C37',
  SQLite: '#0084FF',
  Room: '#22C76A',
  AS: '#22C55E',
  Git: '#F05033',
  Firebase: '#FFA000',
  Gradle: '#02303A',
  Socket: '#3DDC84',
  Stream: '#00A1FB',
  Cashfree: '#5C2D91',
};

export function TechBadge({ name, icon, size = 44 }: { name: string; icon: string; size?: number }) {
  const color = PALETTE[icon] ?? '#3DDC84';

  return (
    <div
      className="group flex flex-col items-center gap-2"
      title={name}
    >
      <div
        className="relative flex items-center justify-center rounded-2xl border border-app bg-surface transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-lg"
        style={{ width: size, height: size }}
      >
        <span
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 12px 30px -10px ${color}` }}
        />
        <TechIcon icon={icon} color={color} size={size * 0.46} />
      </div>
      <span className="text-center text-[11px] font-medium leading-tight text-muted transition-colors group-hover:text-[rgb(var(--text))] sm:text-xs">
        {name}
      </span>
    </div>
  );
}

function TechIcon({ icon, color, size }: { icon: string; color: string; size: number }) {
  // Letter-badge fallback for simple keys
  const letterBadges = ['K', 'J', 'C', 'XML', 'AS', 'JSON', 'API', 'MVVM', 'MVC', 'Clean', 'Link', 'Layers', 'Play', 'Room'];
  if (letterBadges.includes(icon)) {
    const label = icon.length <= 3 ? icon : icon.slice(0, 2);
    return (
      <span
        className="font-mono font-bold leading-none"
        style={{ color, fontSize: icon.length > 2 ? size * 0.5 : size * 0.62 }}
      >
        {label}
      </span>
    );
  }

  switch (icon) {
    case 'Jetpack':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 3l8 9-8 9-8-9 8-9z" fill={color} opacity="0.9" />
          <path d="M12 7l4 5-4 5-4-5 4-5z" fill="#07140d" opacity="0.25" />
        </svg>
      );
    case 'Retrofit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="4" rx="2" fill={color} />
          <rect x="6" y="10" width="12" height="4" rx="2" fill={color} opacity="0.7" />
          <rect x="9" y="16" width="6" height="4" rx="2" fill={color} opacity="0.45" />
        </svg>
      );
    case 'Postman':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill={color} />
          <path d="M15.5 8.5l-4 4-1.5 3 1.5-1 4-4z" fill="#fff" />
        </svg>
      );
    case 'SQLite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M19 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l2-4z" fill={color} />
          <path d="M19 3l-2 4v12a2 2 0 01-2 2h2a2 2 0 002-2V7l2-4h-2z" fill="#000" opacity="0.18" />
        </svg>
      );
    case 'Git':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M23.5 11l-10.4-10.4a1.5 1.5 0 00-2.1 0L8.6 3a1.7 1.7 0 00.5 2.8L7 7.9a1.7 1.7 0 00-2 .3 1.7 1.7 0 00-.4 1.8L2 12.6a1.5 1.5 0 000 2.1l2.7 2.7a1.7 1.7 0 002.8.5l1.3-1.3 4.2 4.2a1.5 1.5 0 002.1 0L23.5 13a1.5 1.5 0 000-2z" fill={color} />
        </svg>
      );
    case 'Firebase':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M4 19l3-15 4 8-2 7z" fill={color} />
          <path d="M8 4l9 16-6-3z" fill={color} opacity="0.55" />
        </svg>
      );
    case 'Gradle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M21 9c-1 3-4 3-6 1-3-3-1-7 3-6 1 0 2 1 2 2 0 0 0-3-3-4-4 0-6 4-5 8 1 3 5 3 8 1 3-2 1-7 1-2z" fill={color} />
        </svg>
      );
    case 'Socket':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill={color} />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Stream':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M4 12c3-5 13-5 16 0-3 5-13 5-16 0z" fill={color} />
          <circle cx="12" cy="12" r="2.2" fill="#fff" />
        </svg>
      );
    case 'Cashfree':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill={color} />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">₹</text>
        </svg>
      );
    default:
      return (
        <span className="font-mono font-bold" style={{ color, fontSize: size * 0.5 }}>
          {icon.slice(0, 2)}
        </span>
      );
  }
}
