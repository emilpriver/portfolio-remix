import { useEffect, useState } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { Post } from "../../types/post";
import { client } from "../../lib/graphql";
import { getPodcasts, getPosts } from "../../lib/graphql/queries";
import dayjs from "dayjs";
import { SpotifyTrack } from "../../types/spotify";
import millisToMinutesAndSeconds from "~/utils/time";
import { Podcast } from "../../types/podcast";

type Data = {
  posts: Array<Post>
  podcasts: Array<Podcast>
  spotify: {
    items: Array<SpotifyTrack>
  }
};

export const loader: LoaderFunction = async () => {
  const { posts } = await client(getPosts);
  const { podcasts } = await client(getPodcasts);

  const spotify = await fetch(
    "https://spotify-list-most-played-songs.emilpriver.workers.dev?limit=10"
  ).then((r) => r.json());

  return json({ posts, spotify, podcasts });
};

export let meta: MetaFunction = () => {
  return {
    title: "Emil Privér",
    description: "Hey, I'm Emil Privér. Developer from Varberg, Sweden.",
  };
};

export default function Index() {
  let { posts, spotify, podcasts } = useLoaderData<Data>();

  return (
    <>
      <div className="w-full mb-12 mt-2">
        <h1 className="font-medium mb-2 text-5xl font-serif">Emil Privér</h1>
        <span className="font-light markdown text-lg">
          Software developer with focus backend, love tech, serverless,
          distributed systems and trying new stuffs.
        </span>
        <span className="font-light markdown text-lg">
          I have open source some projects at{" "}
          <a
            href="https://github.com/emilpriver"
            target="_blank"
            className="underline"
          >
            Github
          </a>
          . Working on adding more projects.
        </span>
      </div>
      <h3 className="w-full mb-4 text-2xl">From the blog</h3>
      <div className="mb-20">
        {posts?.map((el) => (
          <article
            className="relative flex flex-col max-w-3xl lg:ml-auto xl:max-w-none xl:w-[50rem] mb-5"
            key={el.slug}
          >
            <h3 className="mb-4 text-2xl text-gray-900 tracking-tight font-bold">
              <Link to={`/${el.slug}`}>{el.title}</Link>
            </h3>
            <div className="mb-6 markdown">
              <p>{el.content.text?.split(" ").slice(0, 20).join(" ")}</p>
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
              <Link
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-500"
                to={`/${el.slug}`}
              >
                Read more<span className="sr-only">, {el.title}</span>
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
              </Link>
            </div>
          </article>
        ))}
      </div>
      <h3 className="w-full mb-4 text-2xl">Podcasts i've talked on</h3>
      <div className="mb-20">
        {podcasts?.map((pod) => (
          <article
            className="relative flex flex-col max-w-3xl lg:ml-auto xl:max-w-none xl:w-[50rem] mb-5"
            key={pod.id}
          >
            <h3 className="mb-4 text-2xl text-gray-900 tracking-tight font-bold">
              {pod.title}
            </h3>
            <div className="mb-6 markdown">
              <p>{pod.description}</p>
              <p>Published in {pod.language}</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-start">
              <dl>
                <dt className="sr-only">Date</dt>
                <dd className="text-sm leading-6 lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:whitespace-nowrap">
                  <time dateTime="2021-12-09T16:00:00.000Z">
                    {dayjs(pod.date).format("MMMM DD, YYYY")}
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
                className="group inline-flex mr-4 mb-2 items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-500"
                href={pod.spotifyLink}
                target="_blank"
              >
                Listen on Spotify
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
              <a
                className="group inline-flex mr-4 mb-2 items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-500"
                href={pod.appleLink}
                target="_blank"
              >
                Listen on Apple Podcasts
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
              <a
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-500"
                href={pod.googleLink}
                target="_blank"
              >
                Listen on Google Podcasts
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
      <h3 className="w-full text-2xl">
        My most played songs on Spotify this month.
      </h3>
      <a
        href="https://github.com/emilpriver/Cloudflare-Workers-Spotify-most-played-song"
        className="mb-4 w-full float-left underline"
        target="_blank"
      >
        Source code
      </a>
      <ul className="mb-20 list-decimal w-full float-left">
        {spotify?.items?.map((track) => (
          <li key={track.id} className="mb-2">
            <h4 className="text-xl">
              <a href={track.external_urls.spotify} target="_blank">
                {track.name} - ({millisToMinutesAndSeconds(track.duration_ms)})
              </a>
            </h4>
            <div className="flex">
              <div>
                {track.artists.map((el, index) => (
                  <span key={el.id}>
                    <a href={el.external_urls.spotify} target="_blank">
                      {el.name}
                      {track.artists.length > index + 1 ? ", " : ""}
                    </a>
                  </span>
                ))}
              </div>
              <div className="mx-3">-</div>
              <div>
                <span>
                  <a href={track.album.external_urls.spotify} target="_blank">
                    {track.album.name}
                  </a>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
