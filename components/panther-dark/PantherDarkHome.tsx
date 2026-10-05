"use client"

import HeroSection from "./HeroSection"
import PantherChat from "./PantherChat"
import SiteHeader from "./sections/SiteHeader"
import AboutSection from "./sections/AboutSection"
import StackSection from "./sections/StackSection"
import ArchitectureSection from "./sections/ArchitectureSection"
import SandboxSection from "./sections/SandboxSection"
import ProjectsSection from "./sections/ProjectsSection"
import ExperienceSection from "./sections/ExperienceSection"
import PhilosophySection from "./sections/PhilosophySection"
import TelemetrySection from "./sections/TelemetrySection"
import PostMortemsSection from "./sections/PostMortemsSection"
import TrophiesSection from "./sections/TrophiesSection"
import LogbookSection from "./sections/LogbookSection"
import ContactSection from "./sections/ContactSection"

export default function PantherDarkHome() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ArchitectureSection />
      <SandboxSection />
      <ProjectsSection />
      <ExperienceSection />
      <PhilosophySection />
      <TelemetrySection />
      <PostMortemsSection />
      <TrophiesSection />
      <LogbookSection />
      <ContactSection />
      <PantherChat />
    </main>
  )
}
