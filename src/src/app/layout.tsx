import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog",
  description:
    "特にジャンルは決めていない雑食ブログ。エンジニア、プログラマー、筋トレ、ゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} flex justify-center rounded-md bg-gray-900 text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
