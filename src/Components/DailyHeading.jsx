import { motion } from 'framer-motion';
import { getFestivalDay } from '@/lib/festival';

export default function DailyHeading() {
  const day = getFestivalDay();
  const label = `${day.subtitle} · Uma Bodhon 2026`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="px-6 pt-16 pb-12 sm:px-10 lg:px-16 lg:pt-24 lg:pb-16"
    >
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        <span className="h-px w-8 bg-terracotta/50" />
        <span>{label}</span>
      </div>

      <h1 className="mt-6 font-display text-balance text-3xl leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
        <span className="block text-muted-foreground text-lg sm:text-xl font-body italic mb-2">
          {day.title}
        </span>
        <span className="text-terracotta">{day.subtitle}</span>
      </h1>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground font-body">
        {day.description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
        <span>Day {day.index + 1}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        <span>of {day.total}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        <span>{Math.round(((day.index + 1) / day.total) * 100)}% through</span>
      </div>
    </motion.header>
  );
}