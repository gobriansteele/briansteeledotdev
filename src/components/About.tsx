export function About() {
  return (
    <section id="about">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">About</h2>
      </div>
      <div className="flex flex-col gap-8">
        <p>
          I&#39;m an experienced full-stack web developer with a background in
          graphic design. I got started in web-development in 2010 when I
          started &quot;Viewing page source&quot; and got very interested in not
          only designing things for the web, but also building them. I&#39;ve
          progressed through several companies from large enterprises to small
          startups. My history includes time at{' '}
          <a
            href="https://ameriprise.com"
            target="_blank"
            className="font-medium text-white"
          >
            Ameriprise Financial
          </a>
          ,{' '}
          <a
            href="https://vsco.co"
            target="_blank"
            className="font-medium text-white"
          >
            VSCO
          </a>{' '}
          and{' '}
          <a
            href="https://docusign.com"
            target="_blank"
            className="font-medium text-white"
          >
            DocuSign
          </a>
          .
        </p>
        <p>
          These days I&#39;m spending my time at Honor Education as a lead
          software engineer tasked with constructing the learner and creator
          apps as well as an admin tool. I spend my days in TypeScript building
          out a NextJS app backed up by Java api&#39;s, a Postgres DB all
          deployed on AWS infra.
        </p>
        <p>
          When not writing code or designing solutions to engineering challenges
          you can find me on my bike on the local trails here in Santa Fe, NM.
          I&#39;ve also been known to frequent great coffee shops as well as
          breweries with good IPAs.
        </p>
      </div>
    </section>
  )
}
