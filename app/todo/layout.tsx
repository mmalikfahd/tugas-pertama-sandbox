import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo",
  description: "Aplikasi Todo dengan Context API, useMemo, useCallback, dan localStorage.",
};

export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto w-full max-w-4xl">{children}</section>;
}
