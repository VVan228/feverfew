import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout(
    {children,}
    : Readonly<{ children: React.ReactNode; }>
) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
