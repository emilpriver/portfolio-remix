import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { Post } from "../../types/post";
import { client } from "../../lib/graphql";
import { getPost } from "../../lib/graphql/queries";
import dayjs from "dayjs";
import Prism from "prismjs";
import { RichText } from "@graphcms/rich-text-react-renderer";

import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { useEffect } from "react";

type Data = {
  post: Post;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { post } = await client(getPost, { slug: params.slug });

  if (!post) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ post });
};

export let meta: MetaFunction = ({ data }) => {
  if(!data) {
    return {
      title: "Emil Privér - Page not found",
      "og:image": "",
      "og:title": "",
      "og:description": "",
      "og:image:height": "",
      "og:image:width": "",
      description: "",
    }
  }
  const { post } = data as { post: Post };

  return {
    title: `Emil Privér - ${post?.seo?.title ?? ''}`,
    "og:image": post?.seo?.image?.url ?? '',
    "og:title": `Emil Privér - ${post?.seo?.title ?? ''}`,
    "og:description": post?.seo?.description ?? '',
    "og:image:height": "630",
    "og:image:width": "1200",
    description: post?.seo?.description ?? '',
  };
};

const calculateReadingTime = (text: string): string => {
  const wordsPerMinute = 200;
  let result = "0 min read";

  let textLength = text?.split(" ").length;
  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `~${value} min read`;
  }

  return result;
};

export default function Index() {
  let { post } = useLoaderData<Data>();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <div className="container px-2 mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-5xl mb-2">{post.title} </h1>
          <div className="flex pt-2">
            <span className="mr-3 text-base">
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </span>
            <span className="mr-3 text-base">-</span>
            <span className="mr-3 text-base">
              {calculateReadingTime(post.content.text)}
            </span>
          </div>
        </div>
        <article className="markdown lg:markdown-lg w-full mb-12">
          <RichText
            content={post.content.json}
            references={post.content.references}
            renderers={{
              a: ({ children, openInNewTab, href, rel, ...rest }) => {
                if (href && href.match(/^https?:\/\/|^\/\//i)) {
                  return (
                    <a
                      href={href}
                      target={openInNewTab ? "_blank" : "_self"}
                      rel="noreferrer"
                      {...rest}
                    >
                      {children}
                    </a>
                  );
                }

                return (
                  <Link to={href ?? ""}>
                    <a {...rest}>{children}</a>
                  </Link>
                );
              },
              code_block: ({ children }) => {
                return (
                  <pre className="line-numbers language-none">
                    <code>{children}</code>
                  </pre>
                );
              },
            }}
          />
        </article>
        <div className="w-full text-center mb-12">🤙</div>
      </div>
    </>
  );
}
