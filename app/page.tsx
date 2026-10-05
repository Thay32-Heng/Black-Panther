import SiteHeader from "@/components/SiteHeader"
import HeroSection from "@/components/HeroSection"
import AboutMe from "@/components/AboutMe"
import TechStack from "@/components/TechStack"
import Architecture from "@/components/Architecture"
import Sandbox from "@/components/Sandbox"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Philosophy from "@/components/Philosophy"
import Telemetry from "@/components/Telemetry"
import PostMortems from "@/components/PostMortems"
import Certifications from "@/components/Certifications"
import Logbook from "@/components/Logbook"
import ContactSection from "@/components/ContactSection"
import PantherChat from "@/components/PantherChat"
import ScrollReveal from "@/components/ScrollReveal"

export default function Page() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <ScrollReveal><AboutMe /></ScrollReveal>
      <ScrollReveal><TechStack /></ScrollReveal>
      <ScrollReveal><Architecture /></ScrollReveal>
      <ScrollReveal><Sandbox /></ScrollReveal>
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><Philosophy /></ScrollReveal>
      <ScrollReveal><Telemetry /></ScrollReveal>
      <ScrollReveal><PostMortems /></ScrollReveal>
      <ScrollReveal><Certifications /></ScrollReveal>
      <ScrollReveal><Logbook /></ScrollReveal>
      <ScrollReveal><ContactSection /></ScrollReveal>
      <PantherChat />
    </main>
  )
}
