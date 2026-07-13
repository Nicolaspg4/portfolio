export type SectionId = 'hero' | 'projects' | 'timeline' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface BentoCard {
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl: string
}

export interface TimelineEntry {
  id: string
  period: string
  title: string
  organization: string
  description: string
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email'
  label: string
  url: string
}
