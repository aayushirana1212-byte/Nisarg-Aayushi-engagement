// Central place for the invitation details and settings.

// Add a music.mp3 file to public/ to enable background music.
const musicUrl = '/music.mp3';

export const BRIDE = { name: 'Aayushi', parents: 'PareshBhai & PritiBen' };
export const GROOM = { name: 'Nisarg', parents: 'AnilBhai & VaishaliBen' };

export const EVENT = {
  dateLong: '12 December 2026',
  dateUpper: '12 DECEMBER 2026',
  dateDots: '12 • 12 • 2026',
  day: 'Saturday',
  time: '10 AM',
  city: 'Vadodara',
  region: 'Gujarat, India',
  venueName: 'Ashish Restaurant & Banquet',
  venueAddress: 'Pushpakunj Society, Karelibagh',
  venueCity: 'Vadodara, Gujarat 390006',
};

// Exact venue location (Ashish Restaurant & Banquet, Harni Road, Karelibagh).
export const VENUE_COORDS = { lat: 22.3157124, lng: 73.2012021 };
export const VENUE_FULL_ADDRESS =
  'Ashish Restaurant & Banquet, Pushpakunj Society, Karelibagh, Vadodara, Gujarat 390006';

const { lat, lng } = VENUE_COORDS;

// Opens Google Maps (app or website) at the venue, with the address shown.
export const MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_FULL_ADDRESS)}` +
  `&center=${lat},${lng}`;

// Live map shown inside the website. OpenStreetMap allows being embedded
// anywhere (Google Maps refuses to load inside some frames / previews).
const d = 0.0045;
export const MAPS_EMBED_URL =
  `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}` +
  `&layer=mapnik&marker=${lat},${lng}`;

// 12 December 2026, 10:00 AM (local time of the visitor). Month is zero based.
export const EVENT_TARGET = new Date(2026, 11, 12, 10, 0, 0).getTime();

export const MUSIC_SRC = musicUrl;
