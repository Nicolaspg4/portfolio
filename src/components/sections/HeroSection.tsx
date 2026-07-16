import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  Braces,
  Code2,
  Coffee,
  Container,
  Database,
  Download,
  FileCode2,
  GitBranch,
  GraduationCap,
  Mail,
  Monitor,
  Server,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { bentoCards, projects, techStack, timelineEntries } from '../../data/portfolioData'
import type { SectionId } from '../../types/portfolio'

interface HeroSectionProps {
  onNavigate: (sectionId: SectionId) => void
}

interface TerminalLine {
  id: number
  text: string
  tone: 'normal' | 'accent' | 'error' | 'muted'
}

const badgeOffsets = [
  { x: -2, y: 4 },
  { x: 4, y: -3 },
  { x: -3, y: 2 },
  { x: 3, y: -2 },
  { x: -4, y: 3 },
]

const stackIcons: Record<string, LucideIcon> = {
  Python: FileCode2,
  Java: Coffee,
  JavaScript: Braces,
  React: Atom,
  TypeScript: Code2,
  Node: Server,
  SQL: Database,
  Git: GitBranch,
  'VS Code': Monitor,
  Docker: Container,
}

const TERMINAL_WELCOME = "Nicolas OS v1.0.0 - Type 'help' to see available commands."

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const cvUrl = `${import.meta.env.BASE_URL}cv-nicolas-perez-gomez.pdf`
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, text: TERMINAL_WELCOME, tone: 'accent' },
  ])
  const [lineId, setLineId] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  const projectsSummary = useMemo(
    () =>
      projects.map(
        (project) => `- ${project.title} -> ${project.stack.slice(0, 3).join(' + ')}`,
      ),
    [],
  )

  const journeySummary = useMemo(
    () =>
      timelineEntries.map(
        (entry) =>
          `- ${entry.period}: ${entry.title} (${entry.organization})`,
      ),
    [],
  )

  useEffect(() => {
    const historyContainer = historyRef.current
    if (historyContainer) {
      historyContainer.scrollTop = historyContainer.scrollHeight
    }
  }, [history])

  const appendTerminalLines = (lines: Omit<TerminalLine, 'id'>[]) => {
    setHistory((previous) => {
      const withIds = lines.map((line, index) => ({
        ...line,
        id: lineId + index,
      }))
      return [...previous, ...withIds]
    })
    setLineId((prev) => prev + lines.length)
  }

  const runCommand = (rawCommand: string) => {
    const normalized = rawCommand.trim().toLowerCase()

    if (!normalized) {
      return
    }

    if (normalized === 'clear') {
      setHistory([
        { id: lineId, text: TERMINAL_WELCOME, tone: 'accent' },
      ])
      setLineId((prev) => prev + 1)
      return
    }

    appendTerminalLines([
      { text: `nicolas@portfolio:~$ ${rawCommand}`, tone: 'muted' },
    ])

    if (normalized === 'help') {
      appendTerminalLines([
        {
          text: "Available commands: 'skills', 'projects', 'journey', 'contact', 'clear'",
          tone: 'normal',
        },
      ])
      return
    }

    if (normalized === 'skills') {
      appendTerminalLines([
        { text: 'Skills principales:', tone: 'normal' },
        {
          text: `- Lenguajes: ${techStack.slice(0, 3).join(', ')}`,
          tone: 'accent',
        },
        {
          text: `- Frontend: ${techStack.slice(3, 6).join(', ')}`,
          tone: 'accent',
        },
        {
          text: `- Backend/Tools: ${techStack.slice(6).join(', ')}`,
          tone: 'accent',
        },
        { text: '- Especialidad: integración de IA en servicios web', tone: 'accent' },
      ])
      return
    }

    if (normalized === 'projects') {
      appendTerminalLines([
        { text: 'Proyectos destacados:', tone: 'normal' },
        ...projectsSummary.map((project) => ({ text: project, tone: 'accent' as const })),
      ])
      return
    }

    if (normalized === 'journey') {
      appendTerminalLines([
        { text: 'Experiencia y formación:', tone: 'normal' },
        ...journeySummary.map((item) => ({ text: item, tone: 'accent' as const })),
      ])
      return
    }

    if (normalized === 'contact') {
      appendTerminalLines([
        { text: 'Contacto directo:', tone: 'normal' },
        { text: '- Email: nicolaspergom@gmail.com', tone: 'accent' },
        { text: '- GitHub: Nicolaspg4', tone: 'accent' },
      ])
      return
    }

    appendTerminalLines([
      { text: "Command not found. Type 'help' for options.", tone: 'error' },
    ])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(command)
    setCommand('')
  }

  return (
    <section id="hero" className="scroll-mt-28 pt-28 pb-10 md:pt-34 md:pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[var(--color-cyan)] uppercase shadow-[0_8px_30px_var(--color-shadow)]">
              <BrainCircuit size={14} />
            En prácticas
          </span>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl leading-tight font-semibold text-[var(--color-ink)] [font-family:var(--font-heading)] sm:text-5xl lg:text-5xl">
                INGENIERO DE SOFTWARE | DESARROLLADOR WEB
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Mi enfoque profesional se centra en el desarrollo de servicios web, combinando una sólida base de ingeniería de software con la integración avanzada de herramientas y modelos de Inteligencia Artificial (IA)
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {bentoCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 130, damping: 14, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-5 shadow-[0_8px_35px_var(--color-shadow)] backdrop-blur-xl"
              >
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-ink)] [font-family:var(--font-heading)]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{card.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-violet)] bg-[var(--color-violet)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_22px_var(--color-violet-glow)] transition hover:scale-[1.02]"
            >
              Ver proyectos
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </button>

            <a
              href={cvUrl}
              download="CV-Nicolas-Perez-Gomez.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/70 bg-[var(--color-glass)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_0_18px_var(--color-cyan-glow)] transition hover:scale-[1.02]"
            >
              <Download size={16} />
              Descargar CV
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-lime)]/60 bg-[var(--color-glass)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_0_18px_var(--color-lime-glow)] transition hover:scale-[1.02]"
            >
              <Mail size={16} />
              Contacto
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 145, damping: 15 }}
            className="rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-4 shadow-[0_10px_30px_var(--color-shadow)] backdrop-blur-2xl transition hover:border-[var(--color-cyan)]/70 hover:shadow-[0_0_24px_var(--color-cyan-glow)]"
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-[var(--color-cyan)] uppercase">
              Stack principal
            </p>
            <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech, index) => {
              const offset = badgeOffsets[index % badgeOffsets.length]
              const Icon = stackIcons[tech]

              return (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 14, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-panel)]/60 px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-ink)] shadow-[0_0_14px_var(--color-cyan-glow)]"
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                >
                  <Icon size={13} />
                  {tech}
                </motion.span>
              )
            })}
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-6 lg:mt-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 125, damping: 15, delay: 0.04 }}
            className="overflow-hidden rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] shadow-[0_10px_30px_var(--color-shadow)] backdrop-blur-2xl"
          >
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>

              <pre
                className="overflow-x-auto rounded-xl border border-[var(--color-glass-border)] bg-slate-950/85 p-3 text-xs leading-relaxed text-slate-200 sm:text-sm"
                style={{
                  fontFamily:
                    'JetBrains Mono, Fira Code, SFMono-Regular, Menlo, Consolas, monospace',
                }}
              >
                <span className="text-slate-100">{'{'}</span>
                {'\n'}
                <span className="text-cyan-300">  "status"</span>
                <span className="text-slate-300">: </span>
                <span className="text-emerald-300">"coding"</span>
                <span className="text-slate-300">,</span>
                {'\n'}
                <span className="text-cyan-300">  "fuel"</span>
                <span className="text-slate-300">: </span>
                <span className="text-emerald-300">"coffee"</span>
                <span className="text-slate-300">,</span>
                {'\n'}
                <span className="text-cyan-300">  "ai_powered"</span>
                <span className="text-slate-300">: </span>
                <span className="text-fuchsia-300">true</span>
                <span className="text-slate-300">,</span>
                {'\n'}
                <span className="text-cyan-300">  "bugs_created"</span>
                <span className="text-slate-300">: </span>
                <span className="text-yellow-300">104</span>
                <span className="text-slate-300">,</span>
                {'\n'}
                <span className="text-cyan-300">  "bugs_fixed"</span>
                <span className="text-slate-300">: </span>
                <span className="text-yellow-300">105</span>
                {'\n'}
                <span className="text-slate-100">{'}'}</span>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.08 }}
            className="rounded-[var(--radius-glass)] border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 shadow-[0_18px_55px_var(--color-shadow)] backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/70 text-[var(--color-cyan)]">
                <UserRound size={20} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-ink)]">Foto de perfil</h3>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-glass-border)] bg-[linear-gradient(145deg,rgba(124,58,237,0.22),rgba(34,211,238,0.16),rgba(163,230,53,0.14))] p-4">
              <div className="aspect-[4/5] rounded-xl border border-dashed border-[var(--color-glass-border)] bg-[var(--color-panel)]/40" />
              <span className="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-panel)]/70 px-3 py-1 text-xs font-semibold text-[var(--color-lime)]">
                <GraduationCap size={12} />
                La Luisiana, Sevilla
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.12 }}
            className="rounded-[var(--radius-glass)] border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-5 shadow-[0_18px_55px_var(--color-shadow)] backdrop-blur-2xl"
          >
            <div className="mb-3 flex items-center justify-between rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/55 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <span
                className="text-[11px] tracking-[0.08em] text-slate-300"
                style={{
                  fontFamily:
                    'JetBrains Mono, Fira Code, SFMono-Regular, Menlo, Consolas, monospace',
                }}
              >
                terminal.sh
              </span>
              <span className="w-8" />
            </div>

            <div
              className="rounded-xl border border-[var(--color-glass-border)] bg-black/70 p-3"
              onClick={() => inputRef.current?.focus()}
            >
              <div
                ref={historyRef}
                className="mb-2 max-h-44 overflow-y-auto pr-1 text-xs sm:text-sm"
                style={{
                  fontFamily:
                    'JetBrains Mono, Fira Code, SFMono-Regular, Menlo, Consolas, monospace',
                }}
              >
                {history.map((line) => (
                  <p
                    key={line.id}
                    className={`whitespace-pre-wrap ${
                      line.tone === 'error'
                        ? 'text-rose-400'
                        : line.tone === 'accent'
                          ? 'text-cyan-300'
                          : line.tone === 'muted'
                            ? 'text-slate-400'
                              : 'text-emerald-200'
                    }`}
                  >
                    {line.text}
                  </p>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
                <span
                  className="shrink-0 text-xs text-cyan-300 sm:text-sm"
                  style={{
                    fontFamily:
                      'JetBrains Mono, Fira Code, SFMono-Regular, Menlo, Consolas, monospace',
                  }}
                >
                  nicolas@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-xs text-emerald-300 outline-none sm:text-sm"
                  style={{
                    fontFamily:
                      'JetBrains Mono, Fira Code, SFMono-Regular, Menlo, Consolas, monospace',
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
                <span className="text-emerald-300 animate-pulse">|</span>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
