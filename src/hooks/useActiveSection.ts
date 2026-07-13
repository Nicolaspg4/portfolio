import { useEffect, useState } from 'react'
import type { SectionId } from '../types/portfolio'

export const useActiveSection = (ids: SectionId[]) => {
  const [activeSection, setActiveSection] = useState<SectionId>(ids[0])

  useEffect(() => {
    const sectionElements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!sectionElements.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

        if (!visibleEntries.length) {
          return
        }

        const sectionId = visibleEntries[0].target.id as SectionId
        if (ids.includes(sectionId)) {
          setActiveSection(sectionId)
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: '-20% 0px -35% 0px',
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [ids])

  return { activeSection, setActiveSection }
}
