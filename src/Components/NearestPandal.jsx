import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Footprints, MapPinOff, Toilet, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { PANDALS, haversineKm, formatDistance, walkMinutes } from '@/lib/pandals';
import useUserLocation from '@/hooks/useUserLocation';

const KOLKATA_LAT = 22.5726;
const KOLKATA_LNG = 88.3639;

export default function NearestPandal() {
  const { location, geoState } = useUserLocation();
  const [expanded, setExpanded] = useState(false);

  const nearestPandals = location
    ? PANDALS.map((p) => {
        const km = haversineKm(location, { lat: p.lat, lng: p.lng });
        return { ...p, km };
      }).sort((a, b) => a.km - b.km).slice(0, 5)
    : [];

  const getToiletMapsUrl = () => {
    const lat = location?.lat ?? KOLKATA_LAT;
    const lng = location?.lng ?? KOLKATA_LNG;
    return `https://www.google.com/maps/search/public+toilet/@${lat},${lng},15z`;
  };

  const renderPandalItem = (pandal, index) => (
    <motion.div
      key={pandal.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="border-l-2 border-terracotta/50 pl-4 py-3 last:border-b-0"
    >
      <h3 className="font-display text-base text-foreground leading-snug">{pandal.name}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground italic">{pandal.theme}</p>
      <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
        <span className="flex items-center gap-1 text-terracotta/80">
          <MapPin className="h-3 w-3" strokeWidth={1.25} />
          {formatDistance(pandal.km)} away
        </span>
        <span className="flex items-center gap-1">
          <Footprints className="h-3 w-3" strokeWidth={1.25} />
          {walkMinutes(pandal.km)} min walk
        </span>
      </div>
    </motion.div>
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        <span>Nearest Pandals</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {nearestPandals.length === 0 ? (
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <MapPinOff className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
          {geoState === 'asking'
            ? 'Finding your location…'
            : 'Location is off or unavailable. Allow location access to see nearby pandals.'}
        </p>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {nearestPandals.map(renderPandalItem)}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {nearestPandals.slice(0, 1).map(renderPandalItem)}
              </motion.div>
            )}
          </AnimatePresence>

          {nearestPandals.length > 1 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                  Show Less
                </>
              ) : (
                <>
                  Show <span className="font-semibold text-terracotta">{nearestPandals.length}</span> Nearby
                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          )}

          <a
            href={getToiletMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-terracotta/30 bg-terracotta/10 px-4 py-2.5 text-sm font-medium text-terracotta hover:bg-terracotta/20 transition-colors"
            aria-label="Find nearby public toilets on Google Maps"
          >
            <Toilet className="h-4 w-4" strokeWidth={1.5} />
            Find Public Toilets
          </a>
        </>
      )}
    </div>
  );
}