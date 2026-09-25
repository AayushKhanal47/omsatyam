import type { ReactNode } from "react";

const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: ReactNode; action?: ReactNode }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="font-display text-2xl font-bold text-admin-navy">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-admin-slate">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
