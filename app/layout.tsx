import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import { FavoritProvider } from "@/contexts/favorit-context";
import { TemaProvider } from "@/contexts/tema-context";
import { TodoProvider } from "@/contexts/todo-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sand Box",
    template: "%s | Sand Box",
  },
  description: "Latihan Next.js: blog, jadwal sholat, dan aplikasi Todo.",
};

const skripTema = `
try {
  var tema = localStorage.getItem("sandbox:tema");
  if (tema === "gelap") document.documentElement.dataset.tema = "gelap";
} catch (error) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body className="flex min-h-full flex-col">
        <TemaProvider>
          <FavoritProvider>
            <TodoProvider>
              <Header />
              <main className="flex-1">{children}</main>
            </TodoProvider>
          </FavoritProvider>
        </TemaProvider>
      </body>
    </html>
  );
}
