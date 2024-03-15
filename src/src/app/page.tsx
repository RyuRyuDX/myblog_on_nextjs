import Link from "next/link";
import { client } from ".//libs/microcms";
import { NextResponse } from "next/server";

async function listBlog() {
  try {
    const response = await client.getList({
      endpoint: "blog",
      customRequestInit: {
        next: {
          revalidate: 0, // 0秒でページを再読み込み
        },
      },
    });

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
    });
  } catch (error: any) {
    console.error("エラーが発生しました", error);
    return NextResponse.json({
      data: null,
      error: error.message,
    });
  }
}

export default async function BlogList() {
  const response = await listBlog();
  const { data, error } = await response.json();

  if (error != null) return <div>エラーが発生しました。</div>;
  return (
    <main>
      <h1>ここは記事一覧ページです</h1>
      {
        <ul>
          {data != null ? (
            data.map((blog: { [key: string]: string }) => {
              // ISO8601形式の日付文字列をDateオブジェクトに変換
              const date = new Date(blog.publishedAt);

              // Intl.DateTimeFormatを使用して、望む形式に日付をフォーマット
              const formattedDate = new Intl.DateTimeFormat("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24時間表記に設定
                timeZone: "Asia/Tokyo",
              }).format(date);

              return (
                <Link key={blog.id} href={`/blog/${blog.id}`} passHref>
                  <li key={blog.id} className="flex-col justify-between">
                    <div className="bg-gray-300 p-3 my-3 rounded-md shadow-lg border">
                      <h1 className="text-2xl font-semibold">{blog.title}</h1>
                      <h1 className="mt-auto py-2 text-right">
                        {blog.category}
                      </h1>
                      <h1 className="mt-auto text-right">{formattedDate}</h1>
                    </div>
                  </li>
                </Link>
              );
            })
          ) : (
            <li>データがありませんでした。</li>
          )}
        </ul>
      }
    </main>
  );
}
