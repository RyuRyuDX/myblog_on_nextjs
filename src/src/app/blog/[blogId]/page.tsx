import Link from "next/link";
import { client } from "../../libs/microcms";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import parse from "html-react-parser";
import styles from "./page.module.css";

async function getBlog(blogId: string) {
  try {
    const response = await client.get({
      endpoint: "blog",
      contentId: blogId,
      customRequestInit: {
        next: {
          revalidate: 0,
        },
      },
    });

    return NextResponse.json({
      data: response ?? null,
      error: null,
    });
  } catch (error: any) {
    console.error("エラーが発生しました", error);
    return NextResponse.redirect("/404");
  }
}

type Blog = {
  params: {
    blogId: string;
  };
};

export default async function BlogDetail({ params }: Blog) {
  const response = await getBlog(params.blogId);
  const { data, error } = await response.json();

  return (
    <main className="flex flex-col justify-between p-5">
      <div>
        <div className="text-center sm:text-4xl md:text-4xl lg:text-4xl underline decoration-sky-500 mb-5">
          {data.title}
        </div>
        <div className="text-right underline mb-5">
          カテゴリ: {data.category ?? " - "}
        </div>
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif">
          {parse(data.body)}
        </div>
      </div>
      <div className="p-3 text-right">
        <Link className="btn btn-primary m-3" href="/blog">
          記事一覧へ
        </Link>
      </div>
    </main>
  );
}
