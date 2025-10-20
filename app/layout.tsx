import { Provider } from "@/components/ui/provider";
import { degular } from "@/font/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MainStack",
  description: "Make money online the simple way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${degular.variable} antialiased`}
      suppressHydrationWarning
      lang="en"
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
