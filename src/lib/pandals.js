// Uma Bodhon 2026 — real pandal guide, zoned across Kolkata
export const ZONES = [
  { id: 'nearby', label: 'Nearby' },
  { id: 'north', label: 'North Kolkata' },
  { id: 'south', label: 'South Kolkata' },
  { id: 'saltlake', label: 'Salt Lake' },
];

export const PANDALS = [
  // North Kolkata
  { id: 'n01', name: 'Bagbazar Sarbojanin', zone: 'north', theme: 'Ekchala heritage court of the goddess', walk: '5 min from Bagbazar Ghat', lat: 22.5996, lng: 88.3665 },
  { id: 'n02', name: 'Kumartuli Park', zone: 'north', theme: 'Terracotta workshop in the round', walk: '6 min from Sutanuti Metro', lat: 22.601, lng: 88.3742 },
  { id: 'n03', name: 'Pathuriaghata Ghosh Bari', zone: 'north', theme: 'Bonedi bari worship of the Ghosh family', walk: '7 min from Shyambazar', lat: 22.596, lng: 88.374 },
  { id: 'n04', name: 'Ahiritola Sarbojanin', zone: 'north', theme: 'Ekchala tradition with grand light work', walk: '8 min from Ahiritola Ghat', lat: 22.602, lng: 88.365 },
  { id: 'n05', name: 'Shobhabazar Rajbari', zone: 'north', theme: '250-year-old royal bonedi bari puja', walk: '4 min from Shobhabazar Metro', lat: 22.597, lng: 88.37 },
  { id: 'n06', name: 'Nalin Sarkar Street', zone: 'north', theme: 'Art-installation pandal by young sculptors', walk: '6 min from Shyambazar', lat: 22.595, lng: 88.374 },
  { id: 'n07', name: 'Hatibagan Nabin Palli', zone: 'north', theme: 'Intricate chalchitra craft', walk: '5 min from Shyambazar Metro', lat: 22.593, lng: 88.376 },
  { id: 'n08', name: 'Sikdar Bagan Sadharan Durga Utsab', zone: 'north', theme: 'One of the oldest sarbojanins in the city', walk: '7 min from Shyambazar Metro', lat: 22.5935, lng: 88.377 },
  { id: 'n09', name: 'Chorbagan Sarbojanin', zone: 'north', theme: 'Heritage courtyard celebration', walk: '6 min from Girish Park Metro', lat: 22.589, lng: 88.373 },
  { id: 'n10', name: 'Simla Byayam Samity', zone: 'north', theme: 'Puja inside the old akhara courtyard', walk: '5 min from Girish Park Metro', lat: 22.59, lng: 88.371 },
  { id: 'n11', name: 'College Square', zone: 'north', theme: 'Giant idol mirrored in the pool lake', walk: '4 min from College Street', lat: 22.582, lng: 88.368 },
  { id: 'n12', name: 'Md. Ali Park', zone: 'north', theme: 'Grand theme pandal of legends', walk: '5 min from Central Metro', lat: 22.586, lng: 88.369 },
  { id: 'n13', name: "Tiretti Bazaar", zone: 'north', theme: "The Chinese community's century-old puja", walk: '6 min from Central Metro', lat: 22.584, lng: 88.358 },
  { id: 'n14', name: 'Chaltabagan Lohia Panchayat', zone: 'north', theme: 'Manicktalla landmark sarbojanin', walk: '5 min from Girish Park Metro', lat: 22.585, lng: 88.375 },
  { id: 'n15', name: 'Sreebhumi Sporting Club', zone: 'north', theme: 'Famous for world-monument recreations', walk: '8 min from Lake Town', lat: 22.596, lng: 88.396 },
  { id: 'n16', name: 'Thanthania Dutta Bari', zone: 'north', theme: 'Bonedi bari worship since the 1800s', walk: '6 min from Bidhan Nagar', lat: 22.5845, lng: 88.376 },

  // South Kolkata
  { id: 's01', name: 'Santosh Mitra Square', zone: 'south', theme: 'Theme recreations and grand lighting', walk: '6 min from Sealdah', lat: 22.567, lng: 88.374 },
  { id: 's02', name: 'Bhowanipur 75 Palli', zone: 'south', theme: 'A neighbourhood classic since 1948', walk: '7 min from Jatin Das Park Metro', lat: 22.523, lng: 88.347 },
  { id: 's03', name: 'Puddopukur Sarbojanin', zone: 'south', theme: 'Traditional ekchala by the pond', walk: '5 min from Kalighat Metro', lat: 22.522, lng: 88.368 },
  { id: 's04', name: 'Deshapriya Park', zone: 'south', theme: 'A towering idol and one of the largest crowds', walk: '6 min from Kalighat Metro', lat: 22.521, lng: 88.363 },
  { id: 's05', name: 'Maddox Square', zone: 'south', theme: 'Old-world adda under ancient trees', walk: '6 min from Kalighat Metro', lat: 22.527, lng: 88.364 },
  { id: 's06', name: 'Ballygunge Cultural Association', zone: 'south', theme: 'Curated artistry and marquee themes', walk: '7 min from Ballygunge', lat: 22.526, lng: 88.369 },
  { id: 's07', name: 'Hindustan Park Sarbojanin', zone: 'south', theme: 'Gentle, devotion-first celebration', walk: '5 min from Ballygunge', lat: 22.524, lng: 88.366 },
  { id: 's08', name: 'Singhi Park', zone: 'south', theme: 'Marquee theme pandal of Gariahat', walk: '5 min from Gariahat', lat: 22.52, lng: 88.37 },
  { id: 's09', name: 'Badamtala Ashar Sangha', zone: 'south', theme: 'Avant-garde art direction', walk: '6 min from Gariahat', lat: 22.518, lng: 88.369 },
  { id: 's10', name: 'Ekdalia Evergreen Club', zone: 'south', theme: 'Massive monument recreations', walk: '6 min from Gariahat', lat: 22.525, lng: 88.376 },
  { id: 's11', name: 'Samaj Sebi Sangha', zone: 'south', theme: 'Community devotion on Ballygunge Place', walk: '7 min from Kalighat Metro', lat: 22.517, lng: 88.373 },
  { id: 's12', name: 'Bosepukur Sitala Mandir', zone: 'south', theme: 'Heritage village craft', walk: '5 min from Kasba', lat: 22.52, lng: 88.376 },
  { id: 's13', name: 'Bosepukur Talbagan', zone: 'south', theme: 'Sister pandal of the Sitala Mandir cluster', walk: '6 min from Kasba', lat: 22.5205, lng: 88.3765 },
  { id: 's14', name: 'Bengal Club', zone: 'south', theme: 'Rashbehari Avenue classic', walk: '6 min from Rashbehari Metro', lat: 22.519, lng: 88.365 },
  { id: 's15', name: 'Tridhara Sammilani', zone: 'south', theme: 'Concept-pandal innovation', walk: '5 min from Rashbehari Metro', lat: 22.516, lng: 88.364 },
  { id: 's16', name: 'Chetla Agrani', zone: 'south', theme: 'Riverside neighbourhood favourite', walk: '7 min from New Alipore', lat: 22.511, lng: 88.363 },
  { id: 's17', name: 'Babu Bagan Club', zone: 'south', theme: 'Dover Lane adjacent theme craft', walk: '6 min from Golpark', lat: 22.514, lng: 88.372 },
  { id: 's18', name: 'Jodhpur Park 95 Pally', zone: 'south', theme: 'Large-scale theme pandal', walk: '8 min from Jodhpur Park', lat: 22.51, lng: 88.37 },
  { id: 's19', name: 'Selimpur Pally Sarbojanin', zone: 'south', theme: 'Jadavpur corridor favourite', walk: '6 min from Jadavpur', lat: 22.509, lng: 88.377 },
  { id: 's20', name: 'Suruchi Sangha', zone: 'south', theme: 'Award-winning theme craft', walk: '7 min from Alipore', lat: 22.53, lng: 88.333 },
  { id: 's21', name: 'Barisha Club', zone: 'south', theme: 'Rural Bengal nostalgia', walk: '10 min from Behala Chowrasta', lat: 22.49, lng: 88.311 },
  { id: 's22', name: 'Behala Nutan Dal', zone: 'south', theme: 'Old Behala landmark puja', walk: '9 min from Behala', lat: 22.498, lng: 88.317 },
  { id: 's23', name: 'Santoshpur Lake Pally', zone: 'south', theme: 'Anandamela-side grand theme', walk: '8 min from Santoshpur', lat: 22.498, lng: 88.363 },
  { id: 's24', name: 'Kalighat Temple Mandap', zone: 'south', theme: 'Worship at the sacred shakti peetha', walk: '4 min from Kalighat Metro', lat: 22.5205, lng: 88.3425 },

  // Salt Lake (Bidhannagar)
  { id: 'sl01', name: 'Salt Lake AK Block Sarbojanin', zone: 'saltlake', theme: 'Sector I crowd-puller', walk: '6 min from AK Block', lat: 22.592, lng: 88.393 },
  { id: 'sl02', name: 'Salt Lake AL Block Sarbojanin', zone: 'saltlake', theme: 'Neighbourhood classic', walk: '5 min from AL Block', lat: 22.595, lng: 88.392 },
  { id: 'sl03', name: 'Salt Lake AC Block Sarbojanin', zone: 'saltlake', theme: 'Quiet courtyard devotion', walk: '5 min from AC Block', lat: 22.593, lng: 88.395 },
  { id: 'sl04', name: 'Salt Lake AE Block Sarbojanin', zone: 'saltlake', theme: 'One of Salt Lake biggest pandals', walk: '6 min from AE Block', lat: 22.594, lng: 88.401 },
  { id: 'sl05', name: 'Salt Lake BC Block Sarbojanin', zone: 'saltlake', theme: 'Theme pandal of Sector II', walk: '5 min from BC Block', lat: 22.589, lng: 88.398 },
  { id: 'sl06', name: 'Salt Lake CB Block Sarbojanin', zone: 'saltlake', theme: 'Grand pandal by the block pond', walk: '6 min from CB Block', lat: 22.586, lng: 88.407 },
  { id: 'sl07', name: 'Purna Chatterjee Park (CA Block)', zone: 'saltlake', theme: 'Park-side mega pandal', walk: '7 min from CA Block', lat: 22.587, lng: 88.408 },
  { id: 'sl08', name: 'Salt Lake CG Block Sarbojanin', zone: 'saltlake', theme: 'Sector III favourite', walk: '6 min from CG Block', lat: 22.583, lng: 88.405 },
  { id: 'sl09', name: 'Salt Lake DD-14 Sarbojanin', zone: 'saltlake', theme: 'Theme craftsmanship of Sector III', walk: '6 min from DD Block', lat: 22.588, lng: 88.412 },
  { id: 'sl10', name: 'Salt Lake EC Block Sarbojanin', zone: 'saltlake', theme: 'Community-built celebration', walk: '5 min from EC Block', lat: 22.585, lng: 88.41 },
  { id: 'sl11', name: 'Salt Lake FD Block Sarbojanin', zone: 'saltlake', theme: 'Sector III big-ticket theme', walk: '6 min from FD Block', lat: 22.581, lng: 88.412 },
  { id: 'sl12', name: 'Salt Lake GC Block Sarbojanin', zone: 'saltlake', theme: 'GC Block neighbourhood puja', walk: '7 min from GC Block', lat: 22.579, lng: 88.41 },
  { id: 'sl13', name: 'Labony Estate Sarbojanin', zone: 'saltlake', theme: 'Labony landmark pandal', walk: '6 min from Labony', lat: 22.59, lng: 88.411 },
  { id: 'sl14', name: 'Island JC-16 Sarbojanin', zone: 'saltlake', theme: 'Island mega-theme spectacle', walk: '8 min from Karunamoyee', lat: 22.584, lng: 88.4 },

  // North Kolkata & the northern suburbs (continued)
  { id: 'n17', name: 'Darjiparar Mitra Bari', zone: 'north', theme: 'Two-century-old bonedi bari darbar', walk: '6 min from Shyambazar Metro', lat: 22.5965, lng: 88.3705 },
  { id: 'n18', name: 'Chatubabu Latubabur Bari', zone: 'north', theme: "Manicktalla mansion's heritage thakurdalan", walk: '6 min from Girish Park Metro', lat: 22.587, lng: 88.372 },
  { id: 'n19', name: 'Sovabazar De Soho Bari', zone: 'north', theme: "Old aristocracy's closed-door durga dalan", walk: '5 min from Sovabazar Sutanuti Metro', lat: 22.592, lng: 88.3695 },
  { id: 'n20', name: 'Kashi Bose Lane Durga Puja', zone: 'north', theme: 'Narrow-lane devotion by Bagbazar', walk: '5 min from Bagbazar Ghat', lat: 22.5975, lng: 88.369 },
  { id: 'n21', name: 'Shibkrishna Laha Bari', zone: 'north', theme: 'Bonedi bari of old Bowbazar', walk: '6 min from Bowbazar', lat: 22.582, lng: 88.3665 },
  { id: 'n22', name: 'Laha Bari, Patuat Street', zone: 'north', theme: "Stately dalan in the collector's quarter", walk: '7 min from Girish Park Metro', lat: 22.582, lng: 88.364 },
  { id: 'n23', name: 'Lebutala Park Sarbojanin', zone: 'north', theme: "Central Kolkata's grand courtyard pandal", walk: '5 min from Sealdah', lat: 22.585, lng: 88.368 },
  { id: 'n24', name: 'Sinthee More Barowari Sangha', zone: 'north', theme: 'The crossroads crowd-puller of the north', walk: '5 min from Sinthee More', lat: 22.6045, lng: 88.386 },
  { id: 'n25', name: 'Lake Town Adhibasi Brinda', zone: 'north', theme: "Lake Town's festive landmark", walk: '6 min from Lake Town', lat: 22.593, lng: 88.403 },
  { id: 'n26', name: 'Ultadanga Sangrami Sarbojanin', zone: 'north', theme: 'East-west crossroads celebration', walk: '6 min from Ultadanga', lat: 22.593, lng: 88.398 },
  { id: 'n27', name: 'Dum Dum Park Tarun Sangha', zone: 'north', theme: 'Theme artistry near Baguiati', walk: '7 min from Dum Dum Park', lat: 22.612, lng: 88.418 },
  { id: 'n28', name: 'Dum Dum Tarun Dal', zone: 'north', theme: 'Historic Dum Dum institution', walk: '6 min from Dum Dum', lat: 22.625, lng: 88.426 },
  { id: 'n29', name: 'Nagerbazar Doltala Yubak Sangha', zone: 'north', theme: "Doltala's landmark sarbojanin", walk: '4 min from Nagerbazar', lat: 22.642, lng: 88.423 },
  { id: 'n30', name: 'Nagerbazar Nabankur', zone: 'north', theme: 'Neighbourhood classic by Nagerbazar More', walk: '5 min from Nagerbazar', lat: 22.644, lng: 88.4255 },
  { id: 'n31', name: 'Baguiati Sanghasree', zone: 'north', theme: 'East Kolkata theme heavyweight', walk: '6 min from Baguiati', lat: 22.617, lng: 88.431 },
  { id: 'n32', name: 'Baranagar Taala Pukur Sarbojanin', zone: 'north', theme: "Baranagar's beloved big pandal", walk: '5 min from Baranagar Metro', lat: 22.643, lng: 88.386 },
  { id: 'n33', name: 'Baranagar Amrapali Sangha', zone: 'north', theme: 'Art-forward celebration up north', walk: '6 min from Baranagar Metro', lat: 22.6415, lng: 88.388 },
  { id: 'n34', name: 'Kestopur Ujjal Sangha', zone: 'north', theme: "Kestopur's EM Bypass favourite", walk: '6 min from Kestopur', lat: 22.602, lng: 88.426 },

  // South Kolkata (continued)
  { id: 's25', name: 'Bhowanipur Swadhin Sangha', zone: 'south', theme: "75 Palli's bold artistic neighbour", walk: '6 min from Jatin Das Park Metro', lat: 22.52, lng: 88.344 },
  { id: 's26', name: 'Bhowanipur Golden Park', zone: 'south', theme: "Golden Park's marquee theme pandal", walk: '7 min from Jatin Das Park Metro', lat: 22.5245, lng: 88.353 },
  { id: 's27', name: 'Ballygunge Lake Terrace', zone: 'south', theme: 'Quiet elegance by Dhakuria Lake', walk: '6 min from Dhakuria', lat: 22.5225, lng: 88.3645 },
  { id: 's28', name: 'Golf Green Forest Park', zone: 'south', theme: "Forest Park's neighbourhood favourite", walk: '7 min from Golf Green', lat: 22.5075, lng: 88.357 },
  { id: 's29', name: 'Lake Gardens Sammilani', zone: 'south', theme: 'Green-corner celebration', walk: '7 min from Lake Gardens', lat: 22.505, lng: 88.362 },
  { id: 's30', name: 'Naktala Udayan Sangha', zone: 'south', theme: 'Award-winning theme craft of Naktala', walk: '5 min from Garia', lat: 22.4965, lng: 88.3735 },
  { id: 's31', name: 'Ganguly Bagan Tarun Sangha', zone: 'south', theme: "Ganguly Bagan's grand pandal", walk: '6 min from Baghajatin', lat: 22.497, lng: 88.368 },
  { id: 's32', name: 'Patuli Jotindra Milan Sangha', zone: 'south', theme: "Patuli's mega pandal by the lake", walk: '5 min from Patuli', lat: 22.478, lng: 88.367 },
  { id: 's33', name: 'Patuli Sanjeeb Sangha', zone: 'south', theme: 'The sister pandal of Patuli', walk: '6 min from Patuli', lat: 22.477, lng: 88.3695 },
  { id: 's34', name: 'Santoshpur Amrapali Sangha', zone: 'south', theme: "Santoshpur's artistic classic", walk: '6 min from Santoshpur', lat: 22.494, lng: 88.366 },
  { id: 's35', name: 'Survey Park Milan Sangha', zone: 'south', theme: "Survey Park's quiet grandeur", walk: '6 min from Santoshpur', lat: 22.4935, lng: 88.3725 },
  { id: 's36', name: 'Bikramgarh Jatiya Kalyan Samity', zone: 'south', theme: "Jadavpur's giant theme pandal", walk: '6 min from Jadavpur', lat: 22.4925, lng: 88.356 },
  { id: 's37', name: 'Bansdroni Sree Sangha', zone: 'south', theme: "Bansdroni's community showpiece", walk: '6 min from Kudghat', lat: 22.4805, lng: 88.372 },
  { id: 's38', name: 'Sahapur Mallick Bari', zone: 'south', theme: 'Bonedi bari worship in Behala Sahapur', walk: '7 min from Sakherbazar', lat: 22.495, lng: 88.319 },
  { id: 's39', name: 'Sakherbazar Barowari Sangha', zone: 'south', theme: "Old Behala's bustling barowari", walk: '4 min from Sakherbazar', lat: 22.488, lng: 88.309 },
  { id: 's40', name: 'Rashbehari Lake Market Sarbojanin', zone: 'south', theme: 'The heart of Rashbehari Avenue', walk: '4 min from Lake Market', lat: 22.518, lng: 88.367 },
  { id: 's41', name: 'Tiljala Prantik Sangha', zone: 'south', theme: "Tiljala's tight-knit celebration", walk: '6 min from Kasba', lat: 22.535, lng: 88.381 },
  { id: 's42', name: 'Baghajatin Sarvodaya Sangha', zone: 'south', theme: "Baghajatin's landmark pandal", walk: '5 min from Baghajatin', lat: 22.486, lng: 88.379 },
  { id: 's43', name: 'Tollygunge Lakeside Samity', zone: 'south', theme: 'Lakeside devotion in Tollygunge', walk: '6 min from Rabindra Sarobar', lat: 22.5045, lng: 88.349 },
  { id: 's44', name: 'Regent Park Pally Mangal Samity', zone: 'south', theme: "Regent Estate's neighbourhood classic", walk: '6 min from Regent Park', lat: 22.4935, lng: 88.342 },
  { id: 's45', name: 'Taltala Park Sarbojanin', zone: 'south', theme: "Central Kolkata's calm celebration", walk: '6 min from Rabindra Sadan Metro', lat: 22.559, lng: 88.372 },

  // Salt Lake & New Town (continued)
  { id: 'sl15', name: 'Salt Lake AJ Block Sarbojanin', zone: 'saltlake', theme: 'Sector I neighbour favourite', walk: '5 min from AJ Block', lat: 22.591, lng: 88.394 },
  { id: 'sl16', name: 'Salt Lake EE Block Sarbojanin', zone: 'saltlake', theme: 'Grand pandal by the block park', walk: '6 min from EE Block', lat: 22.592, lng: 88.4035 },
  { id: 'sl17', name: 'Salt Lake EA Block Sarbojanin', zone: 'saltlake', theme: "Sector I's quiet classic", walk: '5 min from EA Block', lat: 22.588, lng: 88.406 },
  { id: 'sl18', name: 'Salt Lake AG Block Sarbojanin', zone: 'saltlake', theme: 'Sector I courtyard celebration', walk: '5 min from AG Block', lat: 22.589, lng: 88.399 },
  { id: 'sl19', name: 'Salt Lake BJ Block Sarbojanin', zone: 'saltlake', theme: "Sector II's evening adda", walk: '6 min from BJ Block', lat: 22.5815, lng: 88.406 },
  { id: 'sl20', name: 'Salt Lake BK Block Sarbojanin', zone: 'saltlake', theme: "Sector II's landmark pandal", walk: '5 min from BK Block', lat: 22.5775, lng: 88.4135 },
  { id: 'sl21', name: 'Salt Lake BD Block Sarbojanin', zone: 'saltlake', theme: 'Sector II community celebration', walk: '5 min from BD Block', lat: 22.579, lng: 88.408 },
  { id: 'sl22', name: 'Salt Lake GD Block Sarbojanin', zone: 'saltlake', theme: 'Sector III neighbourhood puja', walk: '6 min from GD Block', lat: 22.5745, lng: 88.4085 },
  { id: 'sl23', name: 'Salt Lake DL Block Sarbojanin', zone: 'saltlake', theme: "DL Block's festive favourite", walk: '6 min from DL Block', lat: 22.577, lng: 88.4165 },
  { id: 'sl24', name: 'Salt Lake IB Block Sarbojanin', zone: 'saltlake', theme: "Sector III's quiet devotion", walk: '6 min from IB Block', lat: 22.5695, lng: 88.4135 },
  { id: 'sl25', name: 'New Town AA-II Sarbojanin', zone: 'saltlake', theme: "New Town's marquee mega-theme", walk: '8 min from AA II', lat: 22.581, lng: 88.456 },
];

// Haversine distance between two {lat, lng} points, in kilometres
export function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function walkMinutes(km) {
  return Math.max(1, Math.ceil((km / 4.5) * 60));
}