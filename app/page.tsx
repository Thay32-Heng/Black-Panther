import "../components/panther-dark/panther-dark.css"
// Phase A — adopted visual language. Namespaced `rin-`, loads after the base
// stylesheet so its :root tokens win, but touches none of the rules above.
import "../components/panther-dark/rin-tokens.css"
// Phase E — Cluster Lab. Still additive and namespaced `rin-lab-`; loads last
// so it can rely on the rin tokens without redefining any of them.
import "../components/panther-dark/rin-lab.css"
import PantherDarkHome from "../components/panther-dark/PantherDarkHome"

export default function HomePage() {
  return <PantherDarkHome />
}
