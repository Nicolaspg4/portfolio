import type {
  BentoCard,
  NavItem,
  Project,
  SocialLink,
  TimelineEntry,
} from '../types/portfolio'

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'timeline', label: 'Journey' },
  { id: 'contact', label: 'Contacto' },
]

export const bentoCards: BentoCard[] = [
  {
    title: 'Formación',
    description:
      'Grado en Ingeniería Informática - Ingeniería del Software (Universidad de Sevilla).',
  },
  {
    title: 'Perfil',
    description:
      'Ingeniero de Software enfocado en la arquitectura y desarrollo de servicios web. Combino fundamentos sólidos de programación con la implementación práctica de Inteligencia Artificial para crear productos digitales eficientes y de alto impacto.',
  },
  {
    title: 'Soft Skills',
    description:
      'Me caracteriza la alta capacidad de adaptación, orientado al trabajo colaborativo y con una sólida motivación por el aprendizaje constante y la superación de objetivos.',
  },
  {
    title: 'Mentalidad',
    description:
      'Ambición alta, enfoque en impacto real y obsesión por mejorar productos con código y criterio.',
  },
]

export const techStack: string[] = [
  'Python',
  'Java',
  'JavaScript',
  'React',
  'TypeScript',
  'Node',
  'SQL',
  'Git',
  'VS Code',
  'Docker',
]

export const projects: Project[] = [
  {
    id: 'ai-resume-lab',
    title: 'Aprendizaje Automático Relacional - Proyecto Universitario',
    description:
      'Desarrollo e implementación de un modelo de aprendizaje automático relacional basado en grafos para la recomendación de libros, utilizando un dataset de Goodreads. El proyecto abarcó todo el pipeline de datos, desde la ingesta y el preprocesamiento con pandas y expresiones regulares (re), hasta la construcción y análisis de un grafo dirigido mediante networkx',
    stack: ['Python', 'NetworkX', 'Pandas', 'Scikit-Learn', 'Matplotlib'],
    githubUrl: 'https://github.com/Nicolaspg4/IA-Aprendizaje-Autom-tico-Relacional.git',
    liveUrl: 'https://ai-resume-lab.vercel.app/',
  },
  {
    id: 'stream-pulse',
    title: 'Mi portfolio',
    description:
      'Diseño, desarrollo y despliegue de una plataforma web optimizada para albergar y exhibir proyectos de Data Science, Machine Learning y desarrollo de software. El sitio fue creado desde cero priorizando la velocidad de carga, la responsividad y una experiencia de usuario limpia, sirviendo como hub central de mi marca profesional.',
    stack: ['React', 'Framer Motion', 'Node', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/nicpergom/stream-pulse',
    liveUrl: 'https://stream-pulse.vercel.app/',
  },
]

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'edu-sevilla',
    period: '2021 - 2025',
    title: 'Ingeniería del Software',
    organization: 'Universidad de Sevilla',
    description:
      'Base técnica fuerte en desarrollo web, arquitectura de software y trabajo continuo en proyectos reales.',
  },
  {
    id: 'edu-lodz',
    period: '2025 - 2026',
    title: 'Estudios Internacionales',
    organization: 'Universidad Politécnica de Lodz, Polonia',
    description:
      'Experiencia internacional enfocada en colaboración multicultural, adaptación rápida y perspectiva global.',
  },
  {
    id: 'internship-spai',
    period: 'Septiembre 2026',
    title: 'Prácticas Profesionales',
    organization: 'SPAI INNOVA ASTIGITAS',
    description:
      'Inicio de carrera profesional aplicando IA y desarrollo de servicios web en entorno de producción.',
  },
]

export const socialLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    label: 'Linkedin',
    url: 'https://www.linkedin.com/in/nicolas-perez-gomez-5748572a1/',
  },
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/Nicolaspg4',
  },
  {
    platform: 'email',
    label: 'Correo',
    url: 'mailto:nicolaspergom@gmail.com',
  },
]
