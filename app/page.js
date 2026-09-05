import Link from "next/link";
import { getBreweries, getRegions, getStats } from "../lib/data";

const HERO_IMAGE = "/images/hero/hero-1.jpg";

const SCENERY = [
  { src: "/images/scenery/1.jpg", caption: "Brecon Beacons" },
  { src: "/images/scenery/2.jpg", caption: "Pembrokeshire coast" },
  { src: "/images/scenery/3.jpg", caption: "Snowdonia" },
  { src: "/images/scenery/4.jpg", caption: "The valleys" }
];

export default function HomePage() {
  const stats = getStats();
  const regions = getRegions();
  const breweries = getBreweries();
  const featured = breweries.slice(0, 6);

  return (
    <>
      <section className="hero-photo" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="wrap">
          <h1>Every Welsh brewery, in one place.</h1>
          <p className="lede">
            A working record of the breweries making beer across Wales today, from
            century old cask ale names to nano breweries pouring their first pints.
          </p>
          <form className="hero-search" action="/breweries" method="GET">
            <input
              className="input"
              type="text"
              name="q"
              placeholder="Search by brewery, town or beer style"
            />
          </form>
          <div className="stats-row">
            <div className="stat">
              <div className="num">{stats.breweryCount}</div>
              <div className="label">breweries listed</div>
            </div>
            <div className="stat">
              <div className="num">{stats.beerCount}</div>
              <div className="label">beers catalogued</div>
            </div>
            <div className="stat">
              <div className="num">{stats.regionCount}</div>
              <div className="label">regions covered</div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap region-strip">
        {regions.map((region) => (
          <Link
            key={region}
            href={`/breweries?region=${encodeURIComponent(region)}`}
            className="region-pill"
          >
            {region}
          </Link>
        ))}
      </div>

      <section className="scenery-strip">
        {SCENERY.map((tile) => (
          <div
            key={tile.src}
            className="scenery-tile"
            style={{ backgroundImage: `url(${tile.src})` }}
            role="img"
            aria-label={tile.caption}
          />
        ))}
      </section>

      <section className="block">
        <div className="wrap">
          <h2>Recently added</h2>
          <p className="section-lede">
            A starting set of well known Welsh breweries. More are being added on a
            rolling basis, region by region.
          </p>
          <div className="brewery-grid">
            {featured.map((brewery) => (
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
                  <div className="town">{brewery.town} &middot; est. {brewery.founded}</div>
                  <p className="desc">{brewery.description}</p>
                  <span className="meta">{brewery.beers.length} beers listed</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
