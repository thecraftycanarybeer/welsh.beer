import Link from "next/link";
import { getBreweries, getRegions } from "../../lib/data";

export const metadata = { title: "Breweries — Welsh Beer Directory" };

export default function BreweriesPage({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase().trim();
  const region = searchParams?.region || "";
  const regions = getRegions();

  let breweries = getBreweries();

  if (region) {
    breweries = breweries.filter((b) => b.region === region);
  }

  if (q) {
    breweries = breweries.filter((b) => {
      const haystack = [
        b.name,
        b.town,
        b.region,
        ...b.beers.map((beer) => beer.name),
        ...b.beers.map((beer) => beer.style)
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return (
    <section className="block">
      <div className="wrap">
        <h2>Breweries</h2>
        <p className="section-lede">
          {breweries.length} of {getBreweries().length} breweries shown.
        </p>

        <form className="filter-row" action="/breweries" method="GET">
          <input
            className="input"
            style={{ maxWidth: 320 }}
            type="text"
            name="q"
            defaultValue={searchParams?.q || ""}
            placeholder="Search breweries or beers"
          />
          <select className="select" name="region" defaultValue={region}>
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button className="region-pill" type="submit">
            Filter
          </button>
        </form>

        <div className="brewery-grid">
          {breweries.map((brewery) => (
            <Link
              key={brewery.slug}
              href={`/breweries/${brewery.slug}`}
              className="brewery-card"
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${brewery.image})` }}
              />
              <div className="card-body">
                <span className="tag">{brewery.region}</span>
                <h3>{brewery.name}</h3>
                <div className="town">
                  {brewery.town} &middot; est. {brewery.founded}
                </div>
                <p className="desc">{brewery.description}</p>
                <span className="meta">{brewery.beers.length} beers listed</span>
              </div>
            </Link>
          ))}
        </div>

        {breweries.length === 0 && (
          <p className="muted" style={{ marginTop: 24 }}>
            No breweries match that search yet.
          </p>
        )}
      </div>
    </section>
  );
}
