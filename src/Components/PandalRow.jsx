import { motion } from 'framer-motion';
import { MapPin, Footprints, Navigation2 } from 'lucide-react';

export default function PandalRow({ pandal, index, distance, walk }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${pandal.lat},${pandal.lng}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.5), ease: 'easeOut' }}
      className="py-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-body text-[15px] text-foreground/90 truncate">{pandal.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground italic">{pandal.theme}</p>
          <div className="mt-2 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={1.25} />
              {distance}
            </span>
            <span className="flex items-center gap-1">
              <Footprints className="h-3 w-3" strokeWidth={1.25} />
              {walk}
            </span>
          </div>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-terracotta/10 text-terracotta text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-terracotta/20 transition-colors whitespace-nowrap shrink-0"
          aria-label={`Open ${pandal.name} in Google Maps`}
        >
          <Navigation2 className="h-3.5 w-3.5" strokeWidth={1.25} />
          Visit
        </a>
      </div>
    </motion.li>
  );
}