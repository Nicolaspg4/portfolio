import { motion } from 'framer-motion'
import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { timelineEntries } from '../../data/portfolioData'
import SectionHeading from '../layout/SectionHeading'

const TimelineSection = () => {
  return (
    <section id="timeline" className="scroll-mt-28 py-16 md:py-24">
      <SectionHeading
        eyebrow="Journey"
        title="Mi recorrido académico y profesional en modo build."
        description="Cada etapa representa crecimiento técnico, adaptabilidad y foco en convertir conocimiento en impacto real."
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[var(--color-violet)] via-[var(--color-cyan)] to-transparent sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {timelineEntries.map((entry, index) => {
            const isExperience = index === timelineEntries.length - 1

            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 130, damping: 15, delay: index * 0.07 }}
                className="relative pl-16 sm:pl-0"
              >
                <div
                  className={`sm:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'
                  }`}
                >
                  <div className="rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-5 shadow-[0_10px_30px_var(--color-shadow)] backdrop-blur-xl">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-[var(--color-glass-border)] bg-[var(--color-panel)]/70 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-cyan)] uppercase">
                        {entry.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-muted)] uppercase">
                        {isExperience ? <BriefcaseBusiness size={14} /> : <GraduationCap size={14} />}
                        {isExperience ? 'Profesional' : 'Académico'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--color-lime)]">
                      {entry.organization}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                      {entry.description}
                    </p>
                  </div>
                </div>

                <span className="absolute top-4 left-[1.2rem] inline-flex size-5 items-center justify-center rounded-full border border-[var(--color-panel)] bg-[var(--color-violet)] shadow-[0_0_16px_var(--color-violet-glow)] sm:left-1/2 sm:-translate-x-1/2" />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
