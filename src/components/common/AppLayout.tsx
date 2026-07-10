import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  color?: "blue" | "violet";
}

export function AppLayout({ children, title, showBack = true, color = "blue" }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} showBack={showBack} color={color} />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
