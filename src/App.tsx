import ContactSection from './components/sections/ContactSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import TimelineSection from './components/sections/TimelineSection'
import Navigation from './components/navigation/Navigation'
import { navItems } from './data/portfolioData'
import { useActiveSection } from './hooks/useActiveSection'
import type { SectionId } from './types/portfolio'

const sectionIds = navItems.map((item) => item.id)

const App = () => {
  const { activeSection, setActiveSection } = useActiveSection(sectionIds)

  const navigateToSection = (sectionId: SectionId) => {
    const sectionElement = document.getElementById(sectionId)
    if (!sectionElement) {
      return
    }

    setActiveSection(sectionId)
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navigation
        items={navItems}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <HeroSection onNavigate={navigateToSection} />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
