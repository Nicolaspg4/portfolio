import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { NavItem, SectionId } from '../../types/portfolio'

interface NavigationProps {
  items: NavItem[]
  activeSection: SectionId
  onNavigate: (sectionId: SectionId) => void
}

const Navigation = ({ items, activeSection, onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSelect = (sectionId: SectionId) => {
    onNavigate(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50">
      <div className="pointer-events-auto mx-auto flex h-16 w-[calc(100%-1.5rem)] max-w-3xl items-center justify-between rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 shadow-[0_10px_45px_var(--color-shadow)] backdrop-blur-2xl sm:px-5">
        <button
          type="button"
          onClick={() => handleSelect('hero')}
          className="text-left"
          aria-label="Ir al inicio"
        >
          <span className="block text-[0.65rem] tracking-[0.24em] text-[var(--color-cyan)] uppercase">
            Portafolio
          </span>
          <span className="block text-base font-semibold [font-family:var(--font-heading)] sm:text-lg">
            Nicolás Pérez Gómez
          </span>
        </button>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Navegación principal">
          {items.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[var(--color-violet)] text-white shadow-[0_0_22px_var(--color-violet-glow)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-glass)] hover:text-[var(--color-ink)]'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((state) => !state)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-ink)] md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            className="pointer-events-auto mx-auto mt-2 w-[calc(100%-1.5rem)] max-w-3xl rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 py-4 backdrop-blur-2xl md:hidden"
            aria-label="Navegacion movil"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {items.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[var(--color-violet)] text-white'
                        : 'bg-[var(--color-panel)]/80 text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
