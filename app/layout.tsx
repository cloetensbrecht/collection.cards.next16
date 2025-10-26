import { cms } from "@/cms";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ThemeProvider from "@/components/themeprovider/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collection.cards - TCG Collection Manager",
  description: "Manage your TCG collection online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex items-center justify-center font-sans py-24 bg-linear-to-b from-zinc-50 to-background dark:from-zinc-800">
            {children}
          </div>
          <Toaster />
          <cms.previews widget />
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
