import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // クライアントコンポーネントをインポート

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog",
  description:
    "特にジャンルは決めていない雑食ブログ。エンジニア、プログラマー、筋トレ、ゲーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} flex justify-center rounded-md bg-gray-900 text-white min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
