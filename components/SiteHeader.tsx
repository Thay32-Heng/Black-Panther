export default function SiteHeader() {
  return (
      <header className="site-header">
        <a className="brand" href="#" aria-label="Portfolio home">
          <span className="brand-mark">D/</span>
          <span className="brand-name">DATA SYSTEMS</span>
        </a>

        <div className="availability">
          <span className="availability-dot" />
          Available for select projects
        </div>
      </header>
  )
}