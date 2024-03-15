import Link from "next/link";
import { client } from "../../libs/microcms";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import parse from "html-react-parser";

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
    redirect("/404");
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
    <main>
      <h2 className="text-3xl">{data.title}</h2>
      <div className="leading-8">{parse(data.body)}</div>
      <Link className="btn btn-primary m-3 text-right" href="/blog">
        記事一覧へ
      </Link>
    </main>
  );
}
