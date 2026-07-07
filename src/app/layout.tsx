import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wisebirds 앱 광고 교육 · 중급편 | W-Insight",
  description:
    "Wisebirds W-Insight 앱 광고 교육 중급편 — 앱 리타겟팅, iOS SKAN, 웹투앱·앱투웹 광고. 앱 광고 방식의 확장.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F4F4F7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
