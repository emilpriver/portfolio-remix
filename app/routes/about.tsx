import type { MetaFunction } from "remix";
import { Link } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Emil Privér - About",
    description: "Hey, I'm Emil Privér. Developer from Varberg, Sweden.",
    'og:title': 'Emil Privér'
  };
};

export default function About() {
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
      <h2 className="text-4xl">Open Source projects</h2>
      <span>TBA</span>
    </div>
  );
}
