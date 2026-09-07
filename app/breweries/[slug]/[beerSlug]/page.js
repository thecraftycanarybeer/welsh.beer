import Link from "next/link";
import { notFound } from "next/navigation";
import { getBeer, getBreweries } from "../../../../lib/data";

export function generateStaticParams() {
  const params = [];
  for (const brewery of getBreweries()) {
    for (const beer of brewery.beers) {
      params.push({ slug: brewery.slug, beerSlug: beer.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const beer = getBeer(params.slug, params.beerSlug);
  if (!beer) return {};
  return { title: `${beer.name} — ${beer.brewery.name}` };
}

export default function BeerPage({ params }) {
  const beer = getBeer(params.slug, params.beerSlug);
  if (!beer) notFound();

  return (
    <>
      {beer.image && (
        <div
          className="detail-banner"
          style={{
            backgroundImage: `url(${beer.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
          role="img"
          aria-label={beer.name}
        />
      )}
      <section className="detail-hero">
        <div className="wrap">
          <Link href={`/breweries/${beer.brewery.slug}`} className="eyebrow-link">
            &larr; {beer.brewery.name}
          </Link>
          <h1>{beer.name}</h1>
          <div className="detail-meta">
            <span className="abv">{beer.abv}</span>
            <span>{beer.style}</span>
            <span>{beer.brewery.town}, {beer.brewery.region}</span>
            {beer.buyUrl && (
              <a href={beer.buyUrl} target="_blank" rel="noopener noreferrer">
                Buy this beer &rarr;
              </a>
            )}
          </div>
          <p className="detail-desc">{beer.description}</p>
        </div>
      </section>
    </>
  );
}
