import type { MetaFunction } from "remix";
import { Link } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Emil Privér - Projects",
    description: "Hey, I'm Emil Privér. Developer from Varberg, Sweden.",
    'og:title': 'Emil Privér'
  };
};

export default function About() {
  return (
    <div className="container px-2 max-w-5xl mx-auto py-12 font-normal">
      <div className="markdown lg:markdown-xl mb-12 font-serif">
       <p>
         TBA
       </p>
      </div>
    </div>
  );
}
