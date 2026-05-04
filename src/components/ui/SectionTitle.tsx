// src/components/ui/SectionTitle.tsx

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({ eyebrow, title, subtitle, center }: Props) {
  const alignClass = center ? "section-title-wrap--center" : "section-title-wrap--left";
  const subtitleAlignClass = center ? "section-title__subtitle--center" : "section-title__subtitle--left";
  
  return (
    <div className={`section-title-wrap ${alignClass}`}>
      {eyebrow && (
        <p className="section-title__eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 className={`section-title__h2 ${subtitle ? "section-title__h2--has-subtitle" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-title__subtitle ${subtitleAlignClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
