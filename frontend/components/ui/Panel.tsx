import { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export function Panel({ children, title, className = "" }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      {title ? <h2 className="panel-title">{title}</h2> : null}
      {children}
    </section>
  );
}
