import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  FolderGit2,
  Mail,
  Send,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { socialLinks } from '../../data/portfolioData'
import type { SocialLink } from '../../types/portfolio'
import SectionHeading from '../layout/SectionHeading'

interface ContactFormState {
  name: string
  email: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  message: '',
}

const socialIcons: Record<SocialLink['platform'], LucideIcon> = {
  github: FolderGit2,
  linkedin: BriefcaseBusiness,
  email: Mail,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined

const ContactSection = () => {
  const [form, setForm] = useState<ContactFormState>(initialFormState)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const validate = (state: ContactFormState) => {
    const nextErrors: ContactFormErrors = {}

    if (!state.name.trim()) {
      nextErrors.name = 'Escribe tu nombre.'
    }

    if (!state.email.trim()) {
      nextErrors.email = 'Escribe tu email.'
    } else if (!emailPattern.test(state.email.trim())) {
      nextErrors.email = 'Usa un formato de email valido.'
    }

    if (!state.message.trim()) {
      nextErrors.message = 'Escribe un mensaje.'
    } else if (state.message.trim().length < 10) {
      nextErrors.message = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    setIsSubmitted(false)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      setSubmitError(
        'Falta configurar el endpoint del formulario. Añade VITE_FORMSPREE_ENDPOINT en tu .env.local.',
      )
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Error enviando formulario')
      }

      setIsSubmitted(true)
      setForm(initialFormState)
    } catch {
      setSubmitError(
        'No se pudo enviar el mensaje ahora mismo. Intenta de nuevo en unos minutos.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-16 md:py-24">
      <SectionHeading
        eyebrow="Contacto"
        title="Contáctame si tienes alguna propuesta de trabajo o de proyecto"
        description="Respondo rápido y con foco total."
      />

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.aside
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: 'spring', stiffness: 130, damping: 14 }}
          className="rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 shadow-[0_10px_30px_var(--color-shadow)] backdrop-blur-2xl"
        >
          <h3 className="mb-2 text-xl font-semibold text-[var(--color-ink)]">Conecta conmigo</h3>
          <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">
            Abierto a nuevos retos como desarrollador de software y a colaborar
            en productos donde tecnologia y experiencia de usuario vayan al maximo.
          </p>

          <div className="space-y-3">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.platform]

              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.platform === 'email' ? undefined : '_blank'}
                  rel={link.platform === 'email' ? undefined : 'noreferrer'}
                  className="group inline-flex w-full items-center justify-between rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/70 px-4 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_0_14px_transparent] transition hover:border-[var(--color-cyan)] hover:shadow-[0_0_14px_var(--color-cyan-glow)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={16} />
                    {link.label}
                  </span>
                  <span className="text-xs text-[var(--color-muted)] transition group-hover:text-[var(--color-cyan)]">
                    Abrir
                  </span>
                </a>
              )
            })}
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 130, damping: 14 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 shadow-[0_10px_30px_var(--color-shadow)] backdrop-blur-2xl"
          aria-label="Formulario de contacto"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--color-ink)]">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }}
              className="w-full rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/75 px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-violet)] focus:shadow-[0_0_16px_var(--color-violet-glow)]"
              placeholder="Tu nombre"
            />
            {errors.name ? (
              <p className="mt-2 text-xs font-semibold text-red-500">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--color-ink)]">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }}
              className="w-full rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/75 px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-cyan)] focus:shadow-[0_0_16px_var(--color-cyan-glow)]"
              placeholder="tuemail@dominio.com"
            />
            {errors.email ? (
              <p className="mt-2 text-xs font-semibold text-red-500">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[var(--color-ink)]">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, message: event.target.value }))
              }}
              className="w-full resize-none rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-panel)]/75 px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-lime)] focus:shadow-[0_0_16px_var(--color-lime-glow)]"
              placeholder="Cuentame sobre tu proyecto u oportunidad..."
            />
            {errors.message ? (
              <p className="mt-2 text-xs font-semibold text-red-500">{errors.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-violet)] bg-[var(--color-violet)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_16px_var(--color-violet-glow)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
          >
            <Send size={15} />
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {isSubmitted && !hasErrors ? (
            <p className="text-sm font-semibold text-[var(--color-lime)]">
              Mensaje enviado correctamente. Te responderé pronto.
            </p>
          ) : null}

          {submitError ? (
            <p className="text-sm font-semibold text-red-400">{submitError}</p>
          ) : null}
        </motion.form>
      </div>
    </section>
  )
}

export default ContactSection
