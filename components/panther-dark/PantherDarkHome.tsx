"use client"

import HeroSection from "./HeroSection"
import SiteHeader from "./sections/SiteHeader"
import AboutSection from "./sections/AboutSection"
import ArchitectureSection from "./sections/ArchitectureSection"
import SandboxSection from "./sections/SandboxSection"
import ProjectsSection from "./sections/ProjectsSection"
import ExperienceSection from "./sections/ExperienceSection"
import PhilosophySection from "./sections/PhilosophySection"
import WritingSection from "./sections/WritingSection"
import SignalsSection from "./sections/SignalsSection"
import TelemetrySection from "./sections/TelemetrySection"
import ContactSection from "./sections/ContactSection"

export default function PantherDarkHome() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ArchitectureSection />
      <SandboxSection />
      <ProjectsSection />
      <ExperienceSection />
      <PhilosophySection />
      <WritingSection />
      <SignalsSection />
      <TelemetrySection />
      <ContactSection />
    </main>
  )
}
