import "../components/panther-dark/panther-dark.css"
// Phase A — adopted visual language. Namespaced `rin-`, loads after the base
// stylesheet so its :root tokens win, but touches none of the rules above.
import "../components/panther-dark/rin-tokens.css"
// Phase E — Cluster Lab. Still additive and namespaced `rin-lab-`; loads last
// so it can rely on the rin tokens without redefining any of them.
import "../components/panther-dark/rin-lab.css"
// Hero 3D terrain. Same rule as the layers above: additive, namespaced, and
// loaded last so it never has to fight the base stylesheet.
import "../components/panther-dark/rin-hero.css"
import PantherDarkHome from "../components/panther-dark/PantherDarkHome"

export default function HomePage() {
  return <PantherDarkHome />
}
