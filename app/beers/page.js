import Link from "next/link";
import { getAllBeers, getStyles } from "../../lib/data";

export const metadata = { title: "Beers — Welsh Beer Directory" };

export default function BeersPage({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase().trim();
  const style = searchParams?.style || "";
  const styles = getStyles();

  let beers = getAllBeers();

  if (style) {
    beers = beers.filter((b) => b.style === style);
  }

  if (q) {
    beers = beers.filter((b) => {
      const haystack = [b.name, b.style, b.breweryName, b.breweryTown, b.region]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  beers.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="block">
      <div className="wrap">
        <h2>Beers</h2>
        <p className="section-lede">
          {beers.length} of {getAllBeers().length} beers shown, across every listed brewery.
        </p>

        <form className="filter-row" action="/beers" method="GET">
          <input
            className="input"
            style={{ maxWidth: 320 }}
            type="text"
            name="q"
            defaultValue={searchParams?.q || ""}
            placeholder="Search beers, breweries or towns"
          />
          <select className="select" name="style" defaultValue={style}>
            <option value="">All styles</option>
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="region-pill" type="submit">
            Filter
          </button>
        </form>

        <table className="beer-table">
          <thead>
            <tr>
              <th>Beer</th>
              <th>Brewery</th>
              <th>Style</th>
              <th>ABV</th>
            </tr>
          </thead>
          <tbody>
            {beers.map((beer) => (
              <tr key={`${beer.brewerySlug}-${beer.slug}`}>
                <td>
                  <div className="beer-name">
                    <Link href={`/breweries/${beer.brewerySlug}/${beer.slug}`}>
                      {beer.name}
                    </Link>
                  </div>
                </td>
                <td className="muted">
                  <Link href={`/breweries/${beer.brewerySlug}`}>{beer.breweryName}</Link>
                </td>
                <td className="muted">{beer.style}</td>
                <td className="abv">{beer.abv}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {beers.length === 0 && (
          <p className="muted" style={{ marginTop: 24 }}>
            No beers match that search yet.
          </p>
        )}
      </div>
    </section>
  );
}
