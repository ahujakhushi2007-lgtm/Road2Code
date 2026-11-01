import { Link } from 'react-router-dom'

// Rendered by the catch-all route path="*" for any URL that matches no other route.
function NotFoundPage() {
  return (
    <section className="page not-found">
      <div className="not-found__line" aria-hidden="true">
        <span /><span /><span className="is-broken" />
      </div>
      <p className="not-found__code">404</p>
      <h1>Wrong turn. This page isn't on any route.</h1>
      <p>Check the address, or head back and pick a track.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </section>
  )
}

export default NotFoundPage
