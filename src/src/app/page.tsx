import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center">
      <h1>ここはトップページです。</h1>
      <Link href="/blog">記事一覧へ</Link>
    </main>
  );
}
