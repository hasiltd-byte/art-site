import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PaintingProvider } from "@/components/PaintingProvider";
import { getServerPaintings } from "@/lib/server-paintings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Zvi Aharon Art", template: "%s | Zvi Aharon" },
  description: "Contemporary intuitive painting by Israeli artist Zvi Aharon.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const paintings = await getServerPaintings();
  return (
    <html lang="en">
      <body>
        <PaintingProvider initialPaintings={JSON.parse(JSON.stringify(paintings))} dataSource={process.env.PAINTING_DATA_SOURCE}>
          <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(128,88,38,.12),transparent_25%),#090a0a]">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </PaintingProvider>
      </body>
    </html>
  );
}
