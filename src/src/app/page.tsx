import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen w-full">
      <div className="text-center">
        <Link href="/blog" passHref>
          <div className="flex flex-col items-center mb-4">
            <div className="text-2xl font-semibold">BLOG</div>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold">PROFILE（準備中）</div>
          </div>
        </Link>
      </div>
    </main>
  );
}
