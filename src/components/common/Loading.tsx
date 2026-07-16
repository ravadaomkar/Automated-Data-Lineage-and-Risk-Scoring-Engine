type LoadingProps = {
  label?: string;
};

// Ready for Module 4, once services/* call a real API instead of the mock
// stream and hooks need a pending state to render.
export function Loading({ label = "Loading…" }: LoadingProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span>{label}</span>
    </div>
  );
}
