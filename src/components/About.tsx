export function About() {
  return (
    <section id="about">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">About</h2>
      </div>
      <div className="flex flex-col gap-6 text-foreground-secondary leading-relaxed">
        <p>
          I&apos;m the{' '}
          <span className="text-foreground font-semibold">
            Head of AI at Honor Education
          </span>
          , where I lead research projects and leverage artificial intelligence
          to transform our platform. With a background in full-stack development
          and graphic design, I bring a unique perspective to building
          AI-powered solutions.
        </p>
        <p>
          My journey in tech started in 2010 when I got curious about &quot;
          viewing page source&quot; and fell in love with not only designing for
          the web, but building it. Since then, I&apos;ve progressed through
          companies ranging from large enterprises to innovative startups,
          including{' '}
          <a
            href="https://ameriprise.com"
            target="_blank"
            className="link-underline"
          >
            Ameriprise Financial
          </a>
          ,{' '}
          <a href="https://vsco.co" target="_blank" className="link-underline">
            VSCO
          </a>
          , and{' '}
          <a
            href="https://docusign.com"
            target="_blank"
            className="link-underline"
          >
            DocuSign
          </a>
          .
        </p>
        <p>
          These days, I spend my time working across the entire platform at{' '}
          <a
            href="https://honor.education"
            target="_blank"
            className="link-underline"
          >
            Honor Education
          </a>
          —from native clients to Java backends, with TypeScript, Python, and AI
          models in between. I&apos;m passionate about the intersection of
          engineering leadership and cutting-edge AI technology.
        </p>
        <p>
          When I&apos;m not writing code or leading AI initiatives, you can find
          me{' '}
          <a
            href="https://www.strava.com/athletes/33433580"
            target="_blank"
            className="link-underline"
          >
            on my bike
          </a>{' '}
          exploring Minneapolis, MN, or discovering great coffee shops and
          breweries with excellent IPAs.
        </p>
      </div>
    </section>
  )
}
