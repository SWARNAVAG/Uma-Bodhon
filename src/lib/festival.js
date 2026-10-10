// Uma Bodhon 2026 — festival day map (Mahalaya → Dashami)
// Dates per the 2026 Bengali panjika / Durga Puja calendar
export const FESTIVAL_DAYS = [
  { date: '2026-10-10', key: 'mahalaya', title: 'Jago Tumi Jago', subtitle: 'Shubho Mahalaya', description: 'The awakening. Mahalaya marks the Goddess descending to earth as Devi Paksha begins.' },
  { date: '2026-10-11', key: 'pratipada', title: 'Pratipada', subtitle: 'Devipaksha Pratipada', description: 'The first light of the fortnight. Quiet preparations begin.' },
  { date: '2026-10-12', key: 'dwitiya', title: 'Dwitiya', subtitle: 'Devipaksha Dwitiya', description: 'The second dawn. The earth readies itself.' },
  { date: '2026-10-13', key: 'tritiya', title: 'Tritiya', subtitle: 'Devipaksha Tritiya', description: 'The third day of gentle anticipation.' },
  { date: '2026-10-14', key: 'chaturthi', title: 'Chaturthi', subtitle: 'Devipaksha Chaturthi', description: 'The fourth day. The pandals begin to take shape.' },
  { date: '2026-10-15', key: 'panchami', title: 'Panchami', subtitle: 'Devipaksha Panchami', description: 'The eve of invocation. Final touches are laid.' },
  { date: '2026-10-16', key: 'shashthi', title: 'Bodhon', subtitle: 'Shubho Shashthi', description: 'Kalparambha and Akal Bodhon — the Goddess is welcomed into her earthly abode.' },
  { date: '2026-10-17', key: 'saptami', title: 'Kolabou Snan', subtitle: 'Shubho Saptami', description: 'Navpatrika Puja — the banana-bride is bathed; life is breathed into the idol.' },
  { date: '2026-10-19', key: 'ashtami', title: 'Sandhi Puja', subtitle: 'Shubho Maha Ashtami', description: 'Maha Ashtami — Kumari Puja and the sacred juncture where the Goddess slays Mahishasura.' },
  { date: '2026-10-20', key: 'navami', title: 'Maha Navami', subtitle: 'Shubho Navami', description: 'Navami Homa — the final offerings before the farewell.' },
  { date: '2026-10-21', key: 'dashami', title: 'Bisarjan', subtitle: 'Shubho Dashami', description: 'Vijayadashami — Sindur Khela and Durga Visarjan; the Goddess returns to the Himalayas.' },
];

function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getFestivalDay(date = new Date()) {
  const today = stripTime(date);
  let match = FESTIVAL_DAYS.find(d => {
    const dd = stripTime(new Date(d.date));
    return dd.getTime() === today.getTime();
  });
  if (!match) {
    const past = FESTIVAL_DAYS.filter(d => stripTime(new Date(d.date)) <= today);
    match = past.length ? past[past.length - 1] : FESTIVAL_DAYS[0];
  }
  const index = FESTIVAL_DAYS.indexOf(match);
  return { ...match, index, total: FESTIVAL_DAYS.length };
}

// Dashami immersion — countdown target (evening of Vijayadashami)
export function getDashamiDate() {
  return new Date('2026-10-21T18:30:00+05:30');
}