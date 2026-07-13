import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.24em] text-[var(--color-cyan)] uppercase">
        {eyebrow}
      </p>
      <h2 className="mb-4 text-3xl leading-tight font-semibold text-[var(--color-ink)] [font-family:var(--font-heading)] md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
        {description}
      </p>
    </motion.div>
  )
}

export default SectionHeading
