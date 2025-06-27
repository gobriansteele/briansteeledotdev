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
          These days I&#39;m spending my time at{' '}
          <a
            href="https://honor.education"
            target="_blank"
            className="font-medium text-white"
          >
            Honor Education
          </a>{' '}
          as a principal software engineer working on reseearch projects and
          leveraging AI to make the platform better. I spend my days working
          across the entire platform-from mative clients to the Java backend
          with TypesScript and Python thrown in for good measure.
        </p>
        <p>
          When not writing code or designing solutions to engineering challenges
          you can find me{' '}
          <a
            href="https://www.strava.com/athletes/33433580"
            target="_blank"
            className="font-medium text-white"
          >
            on my bike
          </a>{' '}
          here in Minneapolis, MN. I&#39;ve also been known to frequent great
          coffee shops as well as breweries with good IPAs.
        </p>
      </div>
    </section>
  )
}
