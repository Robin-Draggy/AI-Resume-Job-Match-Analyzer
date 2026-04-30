interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function Section({ icon, title, children }: SectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}