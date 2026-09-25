import type { OrderStatus } from "@/types";

// Shared admin styles, so every admin screen uses the same inputs, cards and buttons.
export const inputCls =
  "w-full rounded-xl border border-admin-border bg-white px-3.5 py-2.5 text-sm text-text placeholder:text-admin-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition disabled:opacity-50";
export const labelCls = "mb-1.5 block text-sm font-medium text-admin-navy";
export const hintCls = "mt-1 text-xs text-admin-muted";
export const cardCls = "rounded-2xl border border-admin-border bg-white";
export const cardTitleCls = "text-[11px] font-semibold uppercase tracking-[0.08em] text-admin-muted";
export const primaryBtnCls =
  "rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50";
export const fileInputCls =
  "text-xs text-admin-slate file:mr-3 file:rounded-full file:border-0 file:bg-admin-tint file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary file:transition-colors hover:file:bg-primary hover:file:text-white";
export const errorCls = "rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger";
export const successCls = "rounded-xl bg-success/10 px-3.5 py-2.5 text-sm text-success";

export const statusBadge: Record<OrderStatus, string> = {
  pending: "bg-accent/15 text-accent",
  confirmed: "bg-primary/15 text-primary",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};
