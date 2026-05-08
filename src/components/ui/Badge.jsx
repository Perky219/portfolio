export function Badge({ children, variant = "accent" }) {
  const styles = {
    accent: "bg-accent/10 text-accent border-accent/20",
    warm: "bg-warm/10 text-warm border-warm/20",
    muted: "bg-ink-3/10 text-ink-2 border-ink-3/20",
  };

  return (
    <span
      className={`inline-block font-mono text-xs px-2 py-0.5 rounded border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
