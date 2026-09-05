import breweries from "../data/breweries.json";

export function getBreweries() {
  return breweries;
}

export function getBrewery(slug) {
  return breweries.find((b) => b.slug === slug);
}

export function getRegions() {
  return Array.from(new Set(breweries.map((b) => b.region)));
}

export function getAllBeers() {
  const beers = [];
  for (const brewery of breweries) {
    for (const beer of brewery.beers) {
      beers.push({
        ...beer,
        brewerySlug: brewery.slug,
        breweryName: brewery.name,
        breweryTown: brewery.town,
        region: brewery.region
      });
    }
  }
  return beers;
}

export function getBeer(brewerySlug, beerSlug) {
  const brewery = getBrewery(brewerySlug);
  if (!brewery) return null;
  const beer = brewery.beers.find((b) => b.slug === beerSlug);
  if (!beer) return null;
  return { ...beer, brewery };
}

export function getStyles() {
  return Array.from(new Set(getAllBeers().map((b) => b.style))).sort();
}

export function getStats() {
  const all = getAllBeers();
  return {
    breweryCount: breweries.length,
    beerCount: all.length,
    regionCount: getRegions().length
  };
}
