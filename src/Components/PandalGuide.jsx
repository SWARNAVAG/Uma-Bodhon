import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinOff } from 'lucide-react';
import { PANDALS, ZONES, haversineKm, formatDistance, walkMinutes } from '@/lib/pandals';
import PandalRow from '@/Components/PandalRow';
import useUserLocation from '@/hooks/useUserLocation';
import useCrowdSignal from '@/hooks/useCrowdSignal';

export default function PandalGuide() {
  const [tab, setTab] = useState('nearby');
  const { location, geoState } = useUserLocation();
  const { getCrowdLevel, getCrowdStatus } = useCrowdSignal();

  const nearby = location
    ? PANDALS.map((p) => {
        const km = haversineKm(location, { lat: p.lat, lng: p.lng });
        return { ...p, km };
      })
        .sort((a, b) => a.km - b.km)
        .slice(0, 8)
    : [];

  const zoneList = PANDALS.filter((p) => p.zone === tab);
  const list = tab === 'nearby' ? nearby : zoneList;
  const zoneLabel = ZONES.find(z => z.id === tab)?.label || tab;

  return (
    <section aria-labelledby="pandal-guide-heading" className="pandal-guide">
      <header className="mb-6">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          <span className="h-px w-8 bg-terracotta/50" />
          <h2 id="pandal-guide-heading" className="text-lg font-medium text-foreground">
            {zoneLabel} Pandals
          </h2>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-muted-foreground">{list.length} stops</span>
        </div>
      </header>

      <nav aria-label="Zone filter" className="mt-5 flex flex-wrap items-center gap-2" role="tablist">
        {ZONES.map((z) => {
          const active = tab === z.id;
          return (
            <button
              key={z.id}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${z.id}`}
              id={`tab-${z.id}`}
              onClick={() => setTab(z.id)}
              className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors ${
                active
                  ? 'border-terracotta/50 bg-terracotta/10 text-terracotta'
                  : 'border-white/10 text-muted-foreground hover:border-terracotta/30 hover:text-terracotta/80'
              }`}
            >
              {z.label}
            </button>
          );
        })}
      </nav>

      <AnimatePresence mode="wait">
        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          key={tab + (geoState === 'granted' ? '-geo' : '')}
        >
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {tab === 'nearby' && geoState !== 'granted' ? (
              <div className="mt-8 flex flex-col items-start gap-3 border border-dashed border-white/10 p-6" role="alert">
                <MapPinOff className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.25} />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {geoState === 'asking'
                    ? 'Asking for your location to find pandals near you…'
                    : 'Location is off or unavailable. Allow location access to see the pandals closest to you.'}
                </p>
              </div>
            ) : (
              <ul className="mt-2 divide-y divide-white/[0.06]" role="list" aria-label={`${zoneLabel} pandals`}>
                {list.map((p, i) => (
                  <PandalRow
                    key={p.id}
                    pandal={p}
                    index={i}
                    distance={
                      tab === 'nearby' && location
                        ? formatDistance(p.km)
                        : p.walk.replace(/^(\d+ min) from/, '$1 ·')
                    }
                    walk={tab === 'nearby' && location ? `${walkMinutes(p.km)} min walk` : p.walk}
                    crowdLevel={getCrowdLevel(p.id)}
                    crowdStatus={getCrowdStatus(p.id)}
                  />
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </section>
  );
}