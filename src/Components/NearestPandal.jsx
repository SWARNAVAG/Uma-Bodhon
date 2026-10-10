import { motion } from 'framer-motion';
import { MapPin, Footprints, MapPinOff } from 'lucide-react';
import { PANDALS, haversineKm, formatDistance, walkMinutes } from '@/lib/pandals';
import useUserLocation from '@/hooks/useUserLocation';

export default function NearestPandal() {
  const { location, geoState } = useUserLocation();

  const nearest = location
    ? PANDALS.map((p) => {
        const km = haversineKm(location, { lat: p.lat, lng: p.lng });
        return { ...p, km };
      }).sort((a, b) => a.km - b.km)[0]
    : null;

  return (
    <div>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        <span>Nearest Pandal</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {!nearest ? (
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <MapPinOff className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
          {geoState === 'asking'
            ? 'Finding your location…'
            : 'Location is off or unavailable. Allow location access to see which pandal is closest to you.'}
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-5 border-l-2 border-terracotta/50 pl-4"
        >
          <h3 className="font-display text-xl text-foreground leading-snug">{nearest.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground italic">{nearest.theme}</p>
          <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            <span className="flex items-center gap-1 text-terracotta/80">
              <MapPin className="h-3 w-3" strokeWidth={1.25} />
              {formatDistance(nearest.km)} away
            </span>
            <span className="flex items-center gap-1">
              <Footprints className="h-3 w-3" strokeWidth={1.25} />
              {walkMinutes(nearest.km)} min walk
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}