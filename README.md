# Welsh Beer Directory

A directory of Welsh breweries and their beers, built in Next.js. Seeded with 19
breweries and around 35 beers across North, Mid, South West and South East Wales.

## Running it locally

```
npm install
npm run dev
```

Then open http://localhost:3000

## Deploying

Push this to a GitHub repo and import it into Vercel, same as your other Next.js
projects. No environment variables needed for this version, since the data lives
in `data/breweries.json`.

## How the data works right now

Everything lives in one file: `data/breweries.json`. Each brewery has a `beers`
array nested inside it. To add a brewery, copy an existing entry and fill in the
fields (`slug` must be unique and URL safe, lowercase with hyphens). To add a beer
to an existing brewery, add an object to its `beers` array with a `slug` unique
within that brewery.

This is deliberately simple for now so you can add breweries by hand or hand a
batch to me to research and add. When you are ready to add more, or want a form
to submit updates rather than editing JSON directly, that is the point to move
this over to Supabase, which fits how you have built other projects. The page
components already read through a small data layer (`lib/data.js`), so swapping
the JSON file for Supabase queries later is a contained change, not a rewrite.

## What is in this first batch

19 breweries: Tiny Rebel, Brains, Crafty Devil, Dark Element, Untapped Brewing,
Felinfoel, Tomos Watkin, Boss Brewing, Mumbles Brewery, Gower Brewery, Harbwr
Brewery, Bluestone Brewing, Purple Moose, Conwy Brewery, Wild Horse Brewing,
Bragdy Nant, Cwrw Llyn, Bragdy Cybi, and Wilderness.

Descriptions are written from scratch rather than copied from brewery or review
sites, since republishing their marketing copy word for word would be a
copyright problem. Facts (locations, founding years, beer names, styles, ABV)
are drawn from public sources and brewery own sites, but every description is
original text.

Crafty Canary is not in this batch. You already run their Shopify store and know
their details better than a web search does, so it is a quick one to add
yourself following the same JSON structure, or send me the details and I will
add it properly.

## Adding your photos

The home page is set up to be image led, and just needs files dropped into the
right folders in `public/images/`. Nothing to edit in the code:

- `public/images/hero/hero-1.jpg` — the big banner photo behind the headline.
  A wide landscape shot works best (roughly 1920x1080 or wider).
- `public/images/scenery/1.jpg` through `4.jpg` — the four-tile strip under the
  region links. `1.jpg` is the tall left tile, `2.jpg` to `4.jpg` fill the two
  smaller ones on the right. Currently captioned Brecon Beacons, Pembrokeshire
  coast, Snowdonia and the valleys in `app/page.js`, change the `caption` values
  there if you use different shots.
- `public/images/breweries/<slug>.jpg` — one photo per brewery, used on the
  brewery cards and the banner on each brewery's own page. The slug is the
  brewery's URL name, so Tiny Rebel is `tiny-rebel.jpg`, Purple Moose is
  `purple-moose.jpg`, and so on. You can see every slug in `data/breweries.json`.

Until a file exists at a given path, that spot just shows a plain dark panel
rather than a broken image, so you can add photos gradually rather than all at
once. Any reasonably sized JPG or PNG works, no resizing required first, though
keeping them under a couple of MB each will help load times.

## Next steps worth considering

- Expand the list: more Mid Wales breweries in particular (Wilderness is the
  only one here so far), plus any newer nano breweries.
- Brewery and beer photography. Right now there are no images. Cloudinary would
  slot in cleanly given you already use it elsewhere.
- A simple "suggest a correction" or "submit a brewery" form once this moves to
  a real database, rather than editing JSON by hand.
- Swap the Google Fonts `<link>` in `app/layout.js` for `next/font` once you are
  building on a machine with normal internet access, for slightly faster loads.
- Tighten the Welsh.Beer tie-in once you have a settled visual identity there.
  Right now the palette and footer badge are a placeholder link to welsh.beer.
