import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";
import styles from "~/styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Gabriel Florit" },
    { name: "description", content: "Gabriel Florit" },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  return (
    <article>
      <h2>
        Barcelona - Lima
        <p></p>
      </h2>
      <header>
        <p>
          here goes text and some more and some more and maybe some more and
          some more because it should be two lines
        </p>
        <h2>Gabriel Florit</h2>
        <p>here goes text and some more and some more and maybe some more</p>
        <h1>The new compendium</h1>
        <h3>
          A web log of mathematics, computational geometry, semiology of
          graphics, and visual design
        </h3>
      </header>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum
          odio. Iaculis nunc sed augue lacus viverra vitae congue eu. Lorem
          ipsum dolor sit amet consectetur. Tortor id aliquet lectus proin nibh
          nisl condimentum. Lorem dolor sed viverra ipsum. Integer enim neque
          volutpat ac tincidunt. Est ante in nibh mauris cursus mattis molestie
          a. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae
          nunc. Pellentesque nec nam aliquam sem. Suspendisse faucibus interdum
          posuere lorem ipsum dolor sit. Viverra ipsum nunc aliquet bibendum.
        </p>
        <p>
          Neque gravida in fermentum et sollicitudin ac orci phasellus egestas.
          Lectus urna duis convallis convallis tellus id interdum. Platea
          dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Ipsum
          dolor sit amet consectetur. In fermentum et sollicitudin ac orci
          phasellus egestas tellus rutrum. Erat nam at lectus urna duis
          convallis. Auctor augue mauris augue neque. Justo eget magna fermentum
          iaculis eu non. Amet venenatis urna cursus eget nunc scelerisque
          viverra mauris in. Facilisis volutpat est velit egestas dui. Duis
          ultricies lacus sed turpis tincidunt id aliquet risus. Auctor augue
          mauris augue neque gravida in fermentum. Risus ultricies tristique
          nulla aliquet enim. Sit amet purus gravida quis blandit turpis cursus
          in.
        </p>
      </section>

      <nav>
        <h3>Table of contents</h3>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
        <span></span>
      </nav>
    </article>
  );
}
