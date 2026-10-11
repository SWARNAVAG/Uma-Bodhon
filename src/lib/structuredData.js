// Generate structured data for pandals
import { PANDALS } from '@/lib/pandals';

export function generatePandalStructuredData() {
  const topPandals = PANDALS
    .filter(p => ['n01', 'n05', 'n11', 'n12', 's04', 's10', 's20', 's30', 'sl04', 'sl07', 'sl14', 'sl25'].includes(p.id))
    .slice(0, 20);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Durga Puja Pandals in Kolkata 2026",
    "description": "Curated list of major Durga Puja pandals in Kolkata with themes and locations",
    "numberOfItems": topPandals.length,
    "itemListElement": topPandals.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": p.name,
        "description": p.theme,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": p.lat,
          "longitude": p.lng
        },
        "url": `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`,
        "touristType": "Cultural Tourism",
        "keywords": ["Durga Puja", "Pandal", p.zone === 'north' ? 'North Kolkata' : p.zone === 'south' ? 'South Kolkata' : 'Salt Lake', p.theme]
      }
    }))
  };
}

export function generateHelplineStructuredData() {
  const helplines = [
    { name: 'Police Emergency', number: '100', category: 'Emergency' },
    { name: 'Women Helpline', number: '1091', category: 'Women Safety' },
    { name: 'Ambulance', number: '102', category: 'Medical' },
    { name: 'Fire Brigade', number: '101', category: 'Emergency' },
    { name: 'Child Helpline', number: '1098', category: 'Child Protection' },
    { name: 'Disaster Management', number: '1077', category: 'Emergency' },
    { name: 'Traffic Police', number: '1073', category: 'Traffic' },
    { name: 'Cyber Crime', number: '1930', category: 'Cyber Security' },
    { name: 'Railway Helpline', number: '139', category: 'Transport' },
    { name: 'Tourist Helpline', number: '1363', category: 'Tourism' },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kolkata Emergency Helpline Numbers 2026",
    "description": "Important helpline numbers for Kolkata during Durga Puja 2026",
    "numberOfItems": helplines.length,
    "itemListElement": helplines.map((h, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "GovernmentService",
        "name": h.name,
        "description": `${h.category} helpline for Kolkata`,
        "serviceType": h.category,
        "areaServed": {
          "@type": "City",
          "name": "Kolkata"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "servicePhone": `+91-${h.number}`,
          "serviceUrl": `tel:${h.number}`,
          "availableLanguage": ["English", "Bengali", "Hindi"]
        }
      }
    }))
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Uma Bodhon 2026",
    "url": "https://umabodhon.com/",
    "description": "Complete Durga Puja 2026 guide for Kolkata with 125+ pandals, real-time crowd signals, helplines, public toilets, weather alerts, and live music.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://umabodhon.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "name": "Uma Bodhon",
      "url": "https://umabodhon.com/"
    }
  };
}

export function generateEventSeriesStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "Durga Puja 2026 Kolkata",
    "description": "Annual Durga Puja festival across Kolkata with 125+ themed pandals",
    "location": {
      "@type": "City",
      "name": "Kolkata",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.5726,
        "longitude": 88.3639
      }
    },
    "startDate": "2026-10-19",
    "endDate": "2026-10-24",
    "eventStatus": "https://schema.org/EventScheduled",
    "organizer": {
      "@type": "Organization",
      "name": "Uma Bodhon",
      "url": "https://umabodhon.com/"
    }
  };
}

export function injectStructuredData() {
  // Inject pandal structured data
  const pandalData = generatePandalStructuredData();
  const pandalScript = document.getElementById('pandal-structured-data');
  if (pandalScript) {
    pandalScript.textContent = JSON.stringify(pandalData);
  }

  // Add helpline structured data
  const helplineScript = document.createElement('script');
  helplineScript.type = 'application/ld+json';
  helplineScript.textContent = JSON.stringify(generateHelplineStructuredData());
  document.head.appendChild(helplineScript);
}

// Auto-inject on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStructuredData);
  } else {
    injectStructuredData();
  }
}