export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p className="footer-note">
          A running record of Welsh breweries and their beers. Spotted something out of date,
          or run a brewery that should be listed? Get in touch and we will add it.
        </p>
        <a
          className="wb-badge"
          href="https://welsh.beer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Part of the <span>Welsh.Beer</span> family
        </a>
      </div>
    </footer>
  );
}
