import { motion } from 'framer-motion'
import { ArrowUpRight, FolderGit2, Zap } from 'lucide-react'
import { projects } from '../../data/portfolioData'
import SectionHeading from '../layout/SectionHeading'

const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-mt-28 py-16 md:py-24">
      <SectionHeading
        eyebrow="Proyectos"
        title="Código limpio, interfaces dinámicas y soluciones escalables."
        description="Proyectos donde combino todas las herramientas que he ido aprendiendo para construir productos que intento sean lo mejor posible."
      />

      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-10">
        <motion.div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ type: 'spring', stiffness: 145, damping: 15, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-5 shadow-[0_8px_35px_var(--color-shadow)] backdrop-blur-2xl"
            >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="absolute top-2 left-4 h-20 w-32 rounded-full bg-[var(--color-violet-glow)] blur-2xl" />
              <div className="absolute right-2 bottom-2 h-20 w-32 rounded-full bg-[var(--color-cyan-glow)] blur-2xl" />
            </div>

            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-panel)]/70 px-3 py-1 text-xs font-semibold text-[var(--color-lime)]">
                <Zap size={13} />
                Proyecto destacado
              </div>

              <h3 className="text-xl font-semibold text-[var(--color-ink)] [font-family:var(--font-heading)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[var(--color-glass-border)] bg-[var(--color-panel)]/60 px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/60 bg-[var(--color-panel)]/80 px-4 py-2 text-sm font-semibold text-[var(--color-ink)] shadow-[0_0_14px_var(--color-cyan-glow)] transition hover:scale-[1.02]"
                >
                  <FolderGit2 size={15} />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-violet)] bg-[var(--color-violet)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_var(--color-violet-glow)] transition hover:scale-[1.02]"
                >
                  <ArrowUpRight size={15} />
                  Demo en vivo
                </a>
              </div>
            </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
