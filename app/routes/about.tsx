import dayjs from "dayjs";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Link } from "remix";
import { client } from "../../lib/graphql";
import { getRepos } from "../../lib/graphql/queries";
import { Repo } from "../../types/repos";

export const loader: LoaderFunction = async () => {
  const { repos } = await client(getRepos);

  return json({ repos });
};

export let meta: MetaFunction = () => {
  return {
    title: "Emil Privér - About",
    description: "Hey, I'm Emil Privér. Developer from Varberg, Sweden.",
    "og:title": "Emil Privér",
  };
};

type Data = {
  repos: Array<Repo>
};

export default function About() {
  const data = useLoaderData<Data>()

  return (
    <div className="container px-2 max-w-5xl mx-auto py-12 font-normal">
      <div className="markdown lg:markdown-xl mb-12 font-serif">
        <p>
          My career started in e-sports by working with e-sport teams and
          developing websites for the teams. Found out I wanted to achieve more
          in life than working with small websites so began learning servers and
          more backend focus areas which today is the area I focus on the most.
        </p>{" "}
        <p>
          Today do I build a lot of small projects which I later deploy to
          services as Lambda or ECS. Also found out I like working with GOlang
        </p>{" "}
        <p>
          I think you need to find out what you want to focus on in life and one
          way to do it is by trying things so you know what you don&apos;t want
          to do in life. So as we speak am I doing my best to become a better
          photgrapher by taking images of things in life and publishing does to{" "}
          <a
            href="https://unsplash.com/@emilpriver"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
          . I also found out writing articles about coding is fun, so I write
          articles as well which you find{" "}
          <Link to="/">
            <a className="underline">here</a>
          </Link>
          .
        </p>
      </div>
      <h2 className="w-full mb-4 text-4xl">Open Source projects</h2>
      {data.repos?.map((el) => (
        <article
          className="relative flex flex-col max-w-3xl lg:ml-auto xl:max-w-none xl:w-[50rem] mb-5"
          key={el.id}
        >
          <h3 className="mb-4 text-xl text-gray-900 tracking-tight font-bold">
            <a href={el.link} target="_blank">{el.title}</a>
          </h3>
          <div className="mb-6 markdown">
            <p>{el.description}</p>
          </div>
          <div className="mt-auto flex flex-row-reverse items-center justify-end">
            <dl>
              <dt className="sr-only">Date</dt>
              <dd className="text-sm leading-6 lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:whitespace-nowrap">
                <time dateTime="2021-12-09T16:00:00.000Z">
                  {dayjs(el.date).format("MMMM DD, YYYY")}
                </time>
              </dd>
            </dl>
            <svg
              width="2"
              height="2"
              fill="currentColor"
              className="mx-4 text-gray-700 lg:hidden"
            >
              <circle cx="1" cy="1" r="1"></circle>
            </svg>
            <a
              className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-500"
              href={el.link}
              target="_blank"
            >
              Go to project on Github
              <svg
                className="overflow-visible ml-3 text-gray-300 group-hover:text-gray-400"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
