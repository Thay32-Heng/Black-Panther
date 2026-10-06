import Link from "next/link"
import "../components/panther-dark/panther-dark.css"

export default function NotFound() {
  return (
    <main className="site-shell not-found">
      <div className="not-found-inner">
        <p className="not-found-code">ERROR / 404</p>
        <h1>Signal Lost.</h1>
        <p className="not-found-copy">
          The coordinate you requested is not on the map. The trail ends here —
          follow the link back to known ground.
        </p>
        <Link className="button button-primary" href="/">
          [ Return to Origin ]
        </Link>
      </div>
    </main>
  )
}
