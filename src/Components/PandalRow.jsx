import { motion } from 'framer-motion';
import { MapPin, Footprints, Navigation2, Users, Users2 } from 'lucide-react';

export default function PandalRow({ pandal, index, distance, walk, crowdLevel, crowdStatus }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${pandal.lat},${pandal.lng}`;
  const isCrowded = crowdStatus === 'crowded';

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.5), ease: 'easeOut' }}
      className="py-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-1.5">
          <h3 className="font-body text-[15px] text-foreground/90 truncate pr-2">{pandal.name}</h3>
          {typeof crowdLevel === 'number' && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.min(index * 0.04, 0.5) + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-[0.1em] transition-all duration-500 shrink-0 ${
                isCrowded
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
              title={isCrowded ? `Crowded (${crowdLevel}%)` : `Not Crowded (${crowdLevel}%)`}
              aria-label={isCrowded ? `Crowded, ${crowdLevel} percent` : `Not crowded, ${crowdLevel} percent`}
            >
              <span
                className={`relative flex h-1.5 w-1.5 rounded-full ${
                  isCrowded ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'
                }`}
              >
                {isCrowded && (
                  <span className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-red-400/30 animate-ping" />
                )}
              </span>
              {isCrowded ? (
                <Users className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Users2 className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              )}
              <span className="tabular-nums">{crowdLevel}%</span>
            </motion.span>
          )}
        </div>
        <p className="text-xs text-muted-foreground italic sm:mt-0">{pandal.theme}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={1.25} />
              {distance}
            </span>
            <span className="flex items-center gap-1">
              <Footprints className="h-3 w-3" strokeWidth={1.25} />
              {walk}
            </span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-terracotta/10 text-terracotta text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-terracotta/20 transition-colors whitespace-nowrap shrink-0 w-full sm:w-auto justify-center"
            aria-label={`Open ${pandal.name} in Google Maps`}
          >
            <Navigation2 className="h-3.5 w-3.5" strokeWidth={1.25} />
            Visit
          </a>
        </div>
      </div>
    </motion.li>
  );
}