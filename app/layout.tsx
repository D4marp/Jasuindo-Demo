import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Identity Verification Prototype",
  description: "Sistem verifikasi identitas - Dummy Version",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
