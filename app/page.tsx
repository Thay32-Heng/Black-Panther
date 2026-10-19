import "../components/panther-dark/panther-dark.css"
// Phase A — adopted visual language. Namespaced `rin-`, loads after the base
// stylesheet so its :root tokens win, but touches none of the rules above.
import "../components/panther-dark/rin-tokens.css"
import PantherDarkHome from "../components/panther-dark/PantherDarkHome"

export default function HomePage() {
  return <PantherDarkHome />
}
