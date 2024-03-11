import Link from "next/link";
import { client } from "../libs/microcms";
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
              return (
                <li key={blog.id}>
                  <h3>{blog.title}</h3>
                  <Link className="btn btn-primary" href={`/blog/${blog.id}`}>
                    詳細へ
                  </Link>
                </li>
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
