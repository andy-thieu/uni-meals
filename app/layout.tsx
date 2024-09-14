import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const satoshi = localFont({
    src: 'font/Satoshi-Variable.woff2',
    display: 'swap',
})


export const metadata: Metadata = {
  title: "uni/meals",
  description: "Mensa App for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
