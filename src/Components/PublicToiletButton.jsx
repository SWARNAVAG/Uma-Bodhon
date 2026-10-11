import useUserLocation from '@/hooks/useUserLocation';
import { Toilet } from 'lucide-react';

const KOLKATA_LAT = 22.5726;
const KOLKATA_LNG = 88.3639;

export default function PublicToiletButton() {
  const { location } = useUserLocation();

  const lat = location?.lat ?? KOLKATA_LAT;
  const lng = location?.lng ?? KOLKATA_LNG;
  const mapsUrl = `https://www.google.com/maps/search/public+toilet/@${lat},${lng},15z`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-lg border border-terracotta/30 bg-terracotta/10 px-6 py-3 text-sm font-medium text-terracotta hover:bg-terracotta/20 transition-colors w-full max-w-sm mx-auto"
      aria-label="Find nearby public toilets on Google Maps"
    >
      <Toilet className="h-4 w-4" strokeWidth={1.5} />
      Find Public Toilets Nearby
    </a>
  );
}