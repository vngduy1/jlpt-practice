interface PassageBoxProps {
  title: string;
  children: React.ReactNode;
}

export function PassageBox({ title, children }: PassageBoxProps) {
  return (
    <div className="mb-8 rounded-xl border border-border bg-muted/30 p-6">
      <p className="mb-5 font-semibold">{title}</p>

      {children}
    </div>
  );
}
