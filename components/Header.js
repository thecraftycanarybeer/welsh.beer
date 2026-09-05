import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          Welsh Beer <span>Directory</span>
        </Link>
        <nav className="nav">
          <Link href="/breweries">Breweries</Link>
          <Link href="/beers">Beers</Link>
        </nav>
      </div>
    </header>
  );
}
