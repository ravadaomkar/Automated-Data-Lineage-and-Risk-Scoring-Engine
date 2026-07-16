type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return <p className="font-mono text-xs text-muted-foreground">{message}</p>;
}
