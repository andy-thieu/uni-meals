import type { Metadata } from "next";
import "./globals.css";
import "./normalize.css"


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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
