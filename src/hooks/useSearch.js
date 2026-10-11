import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { PANDALS, ZONES } from '@/lib/pandals';

const helplineData = [
  { id: 'h1', title: 'Police Emergency', number: '100', category: 'Police & General Emergency', description: 'Immediate police assistance' },
  { id: 'h2', title: 'Women Helpline', number: '1091', category: 'Women Safety', description: 'Women safety and emergency' },
  { id: 'h3', title: 'Ambulance', number: '102', category: 'Medical & Ambulance', description: 'Medical emergency ambulance' },
  { id: 'h4', title: 'Fire Brigade', number: '101', category: 'Fire & Disaster', description: 'Fire emergency services' },
  { id: 'h5', title: 'Child Helpline', number: '1098', category: 'Child Protection', description: 'Child safety and protection' },
  { id: 'h6', title: 'Disaster Management', number: '1077', category: 'Fire & Disaster', description: 'Disaster management helpline' },
  { id: 'h7', title: 'Traffic Police', number: '1073', category: 'Police & General Emergency', description: 'Traffic related emergencies' },
  { id: 'h8', title: 'Cyber Crime', number: '1930', category: 'Police & General Emergency', description: 'Cyber crime reporting' },
  { id: 'h9', title: 'Railway Helpline', number: '139', category: 'Transport', description: 'Railway enquiries and emergencies' },
  { id: 'h10', title: 'Tourist Helpline', number: '1363', category: 'Tourism', description: 'Tourist assistance' },
];

const toiletData = [
  { id: 't1', title: 'Public Toilet - Park Street', location: 'Near Park Street Metro', type: 'Public Toilet', description: 'Clean public toilet near Park Street' },
  { id: 't2', title: 'Public Toilet - Esplanade', location: 'Esplanade Metro Station', type: 'Public Toilet', description: 'Public toilet at Esplanade' },
  { id: 't3', title: 'Public Toilet - Howrah Station', location: 'Howrah Railway Station', type: 'Public Toilet', description: 'Railway station public toilet' },
  { id: 't4', title: 'Public Toilet - Sealdah Station', location: 'Sealdah Railway Station', type: 'Public Toilet', description: 'Railway station public toilet' },
  { id: 't5', title: 'Public Toilet - Salt Lake Sector V', location: 'Sector V, Salt Lake', type: 'Public Toilet', description: 'Public toilet in Salt Lake' },
];

const otherContent = [
  { id: 'o1', title: 'Pujo Radio', type: 'Feature', description: 'Live Bengali music streaming for Durga Puja', category: 'Entertainment' },
  { id: 'o2', title: 'Weather Alerts', type: 'Feature', description: 'Real-time Kolkata weather with rain alerts', category: 'Weather' },
  { id: 'o3', title: 'Nearest Pandals', type: 'Feature', description: 'Find 5 closest pandals to your location', category: 'Navigation' },
  { id: 'o4', title: 'Visit Navigation', type: 'Feature', description: 'One-tap Google Maps directions to any pandal', category: 'Navigation' },
  { id: 'o5', title: 'Crowd Signal', type: 'Feature', description: 'Real-time crowded/free status for each pandal', category: 'Live Data' },
  { id: 'o6', title: 'Daily Puja Schedule', type: 'Information', description: 'Shashthi to Dashami daily rituals and timings', category: 'Schedule' },
  { id: 'o7', title: 'Developer Footer', type: 'Info', description: 'Built with Base44, React, and Framer Motion', category: 'About' },
];

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function useSearch() {
  const fuse = useMemo(() => {
    const pandalItems = PANDALS.map((p) => ({
      id: `pandal-${p.id}`,
      type: 'pandal',
      title: p.name,
      subtitle: p.theme,
      zone: p.zone,
      walk: p.walk,
      lat: p.lat,
      lng: p.lng,
      searchText: normalizeText(`${p.name} ${p.theme} ${p.zone} ${p.walk}`),
      original: p,
    }));

    const helplineItems = helplineData.map((h) => ({
      id: h.id,
      type: 'helpline',
      title: h.title,
      subtitle: h.number,
      category: h.category,
      description: h.description,
      searchText: normalizeText(`${h.title} ${h.number} ${h.category} ${h.description}`),
      original: h,
    }));

    const toiletItems = toiletData.map((t) => ({
      id: t.id,
      type: 'toilet',
      title: t.title,
      subtitle: t.location,
      category: t.type,
      description: t.description,
      searchText: normalizeText(`${t.title} ${t.location} ${t.type} ${t.description}`),
      original: t,
    }));

    const otherItems = otherContent.map((o) => ({
      id: o.id,
      type: 'other',
      title: o.title,
      subtitle: o.type,
      category: o.category,
      description: o.description,
      searchText: normalizeText(`${o.title} ${o.type} ${o.category} ${o.description}`),
      original: o,
    }));

    const allItems = [...pandalItems, ...helplineItems, ...toiletItems, ...otherItems];

    return new Fuse(allItems, {
      keys: ['searchText', 'title', 'subtitle', 'category', 'description', 'zone', 'walk'],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true,
    });
  }, []);

  const search = (query) => {
    if (!query || query.trim().length < 2) return [];
    const normalizedQuery = normalizeText(query.trim());
    const results = fuse.search(normalizedQuery);
    return results.map((r) => ({
      ...r.item,
      score: r.score,
      matches: r.matches,
    }));
  };

  return { search };
}

export function getSearchSuggestions(query) {
  const suggestions = [
    'Bagbazar Sarbojanin',
    'Kumartuli Park',
    'Santosh Mitra Square',
    'Deshapriya Park',
    'Salt Lake',
    'Police Emergency',
    'Ambulance',
    'Women Helpline',
    'Public Toilet',
    'Weather',
    'Nearest Pandals',
    'Pujo Radio',
    'Crowd Status',
  ];
  
  const normalizedQuery = normalizeText(query.toLowerCase());
  return suggestions
    .filter((s) => normalizeText(s).includes(normalizedQuery))
    .slice(0, 5);
}