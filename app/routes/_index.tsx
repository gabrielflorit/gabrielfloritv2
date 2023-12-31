import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";
import { WebWorkerSaysHello } from "~/components/posts/WebWorkerSaysHello/index";
import { DrawRandomBitmap } from "~/components/posts/DrawRandomBitmap/index";
import styles from "~/styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "The New Compendium" },
    {
      name: "description",
      content: "The New Compendium: A web log by Gabriel Florit",
    },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  return (
    <article>
      <h2>gabriel florit</h2>
      <header>
        <h1>The new compendium</h1>
        <h3>A web log of computational geometry and visual design</h3>
      </header>
      <section>
        <WebWorkerSaysHello />
        <DrawRandomBitmap />
      </section>

      <nav>
        <h3>Table of contents</h3>
        <ul>
          <li>Web Worker says hello</li>
          <li>Drawing random bitmaps</li>
        </ul>
      </nav>
    </article>
  );
}
