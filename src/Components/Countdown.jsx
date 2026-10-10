import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDashamiDate, getFestivalDay } from '@/lib/festival';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = getDashamiDate();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const { index, total } = getFestivalDay();
  const progress = Math.min(100, Math.round(((index + 1) / total) * 100));

  const units = [
    { label: 'Days', value: days },
    { label: 'Hrs', value: hours },
    { label: 'Min', value: mins },
    { label: 'Sec', value: secs },
  ];

  return (
    <div>
      <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        <span>Countdown to Bisarjan</span>
      </div>

      <div className="mt-4 flex items-end gap-5 sm:gap-7">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-end">
            <motion.div
              key={u.value}
              initial={{ opacity: 0.4, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-3xl sm:text-4xl tabular-nums text-foreground leading-none"
            >
              {pad(u.value)}
            </motion.div>
            <span className="ml-1.5 mb-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {u.label}
            </span>
            {i < units.length - 1 && (
              <span className="ml-3 mb-1 text-2xl text-muted-foreground/30 font-display">:</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
          <span>Mahalaya</span>
          <span>{progress}%</span>
          <span>Dashami</span>
        </div>
        <div className="mt-2 h-px w-full bg-white/10">
          <motion.div
            className="h-px bg-terracotta/70"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}