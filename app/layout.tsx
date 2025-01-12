import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";

export const metadata: Metadata = {
  title: "Jonny Dev",
  description: "Jonny's Portfolio Site",
  icons: {
    icon: "/brush.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
