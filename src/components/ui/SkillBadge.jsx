import { SKILL_ICONS } from "../../data/skillIcons";

export function SkillBadge({ children }) {
  const entry = SKILL_ICONS[children];
  const Icon = entry?.icon;
  const color = entry?.color;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors"
      style={{
        borderColor: color ? `${color}28` : "var(--color-edge)",
        background: color ? `${color}10` : "var(--color-surface-alt)",
        color: "var(--color-ink-2)",
      }}
    >
      {Icon && <Icon size={12} style={{ color, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
