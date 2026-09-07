import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrewery, getBreweries } from "../../../lib/data";

export function generateStaticParams() {
  return getBreweries().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const brewery = getBrewery(params.slug);
  if (!brewery) return {};
  return { title: `${brewery.name} — Welsh Beer Directory` };
}

export default function BreweryPage({ params }) {
  const brewery = getBrewery(params.slug);
  if (!brewery) notFound();

  return (
    <>
      <div
        className="detail-banner"
        style={{ backgroundImage: `url(${brewery.image})` }}
        role="img"
        aria-label={`${brewery.name} brewery`}
      />
      <section className="detail-hero">
        <div className="wrap">
          <Link href="/breweries" className="eyebrow-link">
            &larr; All breweries
          </Link>
          <h1>{brewery.name}</h1>
          <div className="detail-meta">
            <span>{brewery.town}</span>
            <span>{brewery.region}</span>
            <span>Established {brewery.founded}</span>
            {brewery.website && (
              <a href={brewery.website} target="_blank" rel="noopener noreferrer">
                Visit website &rarr;
              </a>
            )}
          </div>
          <p className="detail-desc">{brewery.description}</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <h2>Beers from {brewery.name}</h2>
          <div className="beer-list-simple">
            {brewery.beers.map((beer) => (
              <div className="beer-row" key={beer.slug}>
                {beer.image && (
                  <div
                    className="beer-thumb"
                    style={{ backgroundImage: `url(${beer.image})` }}
                  />
                )}
                <div className="left">
                  <div className="beer-name">
                    <Link href={`/breweries/${brewery.slug}/${beer.slug}`}>
                      {beer.name}
                    </Link>
                  </div>
                  <p className="muted" style={{ marginTop: 6 }}>
                    {beer.description}
                  </p>
                  {beer.buyUrl && (
                    <a
                      href={beer.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-block", marginTop: 8 }}
                    >
                      Buy this beer &rarr;
                    </a>
                  )}
                </div>
                <div className="right">
                  {beer.style} &middot; {beer.abv}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
