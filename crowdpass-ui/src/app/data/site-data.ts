/* ===========================================================================
   Content models + static marketing copy for the CrowdPass site.
   Event data itself lives in /public/events.json and is loaded at runtime
   by EventsService — edit the JSON to add/change events (no rebuild needed).
   =========================================================================== */

export type EventStatus = 'on-sale' | 'selling-fast' | 'sold-out' | 'coming-soon';

/** Where an event sits in its lifecycle. */
export type EventPhase = 'upcoming' | 'tba' | 'past';

/** A single date/city of an event, with its own ticket link. */
export interface EventShow {
  city: string;
  venue: string;
  date: string;        // human-readable (or "Date to be announced")
  /** Doors / show time, e.g. "Gates 5:00 PM · Show 6:00 PM". */
  time?: string;
  /** External ticketing page for this date/city. Omit when tickets aren't live. */
  url?: string;
  status: EventStatus;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  seating: boolean;
  /** CSS gradient used for the card artwork (and as a fallback behind images). */
  accent: string;
  /** Optional poster image; when present it's shown instead of the gradient. */
  image?: string;
  /** Optional short blurb. */
  description?: string;
  /**
   * upcoming = on sale / coming soon with confirmed dates.
   * tba      = announced, dates not yet confirmed (register interest).
   * past     = finished / no longer on sale.
   */
  phase: EventPhase;
  /**
   * One show  = a single, general event (the card links straight out).
   * Many shows = the same act touring multiple cities, shown as ONE card
   *              that expands to reveal a separate link per city.
   */
  shows: EventShow[];
}

/** True when an event runs in more than one city (a tour). */
export function isTour(event: EventItem): boolean {
  return event.shows.length > 1;
}

export type ShowAction = 'tickets' | 'register' | 'ended' | 'sold-out' | 'soon';

/** What a single show row should offer, given its event's phase + status. */
export function showAction(event: EventItem, show: EventShow): ShowAction {
  if (event.phase === 'past') return 'ended';
  if (show.status === 'sold-out') return 'sold-out';
  if (!show.url) return 'soon';
  if (event.phase === 'tba') return 'register';
  if (show.status === 'coming-soon') return 'soon';
  return 'tickets';
}

const STATUS_LABELS: Record<EventStatus, string> = {
  'on-sale': 'On sale',
  'selling-fast': 'Selling fast',
  'sold-out': 'Sold out',
  'coming-soon': 'Coming soon',
};

export function statusLabel(status: EventStatus): string {
  return STATUS_LABELS[status];
}

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  suitableFor: string[];
  features: string[];
  /** Highlight as the "popular" option. */
  highlight?: boolean;
  example?: string;
}

export const TIERS: Tier[] = [
  {
    id: 'no-seating',
    name: 'CrowdPass Event',
    tagline: 'General admission, done beautifully.',
    suitableFor: ['Parties', 'Workshops', 'Conferences', 'Networking', 'Club nights'],
    features: [
      'Branded event page',
      'Online ticket sales',
      'Up to 5 ticket types',
      'QR code tickets',
      'Check-in app',
      'Sales reports & attendee exports',
      'Coupon codes',
    ],
  },
  {
    id: 'seating',
    name: 'CrowdPass Seating',
    tagline: 'Reserved seating with a live, interactive plan.',
    suitableFor: ['Theatre', 'Concerts', 'Comedy shows', 'Banquets'],
    features: [
      'Everything in CrowdPass Event',
      'Interactive seating plan',
      'Seat selection & blocking',
      'Offline bookings',
      'Live seat availability',
    ],
    highlight: true,
  },
  {
    id: 'subdomain',
    name: 'Branded Subdomain',
    tagline: 'All your events under one branded home.',
    example: 'yourbrand.crowdpass.co.uk',
    suitableFor: ['Promoters', 'Venues', 'Multi-event organisers'],
    features: [
      'Dedicated branded subdomain',
      'Multi-event management',
      'Seating & non-seating events',
      'QR ticketing & check-in app',
      'Sales reporting',
      'Coupon & discount management',
    ],
  },
  {
    id: 'white-label',
    name: 'White-Label Platform',
    tagline: 'Your own fully-branded ticketing portal.',
    example: 'tickets.yourcompany.co.uk',
    suitableFor: ['Event companies', 'Organisations', 'Agencies'],
    features: [
      'Fully branded portal on your domain',
      'Manage multiple events',
      'Full event & customer management',
      'Reserved seating management',
      'Coupons & discount campaigns',
      'Secure hosting, updates & support',
      'Optional marketing website add-on',
    ],
  },
];

export interface Feature {
  title: string;
  body: string;
  icon: string; // key used by the icon component
}

export const FEATURES: Feature[] = [
  {
    icon: 'ticket',
    title: 'Sell in minutes',
    body: 'Spin up a polished event page with multiple ticket types and start taking secure payments today.',
  },
  {
    icon: 'seat',
    title: 'Interactive seating',
    body: 'Build interactive seat maps, block & release seats, and manage offline bookings - all in real time.',
  },
  {
    icon: 'qr',
    title: 'QR check-in',
    body: 'Every ticket is a unique QR code. Scan guests in fast with the CrowdPass check-in app.',
  },
  {
    icon: 'chart',
    title: 'Live reporting',
    body: 'Track sales, revenue and attendance live, then export attendee lists whenever you need them.',
  },
  {
    icon: 'tag',
    title: 'Coupons & discounts',
    body: 'Reward early birds and partners with coupon codes and targeted discount campaigns.',
  },
  {
    icon: 'globe',
    title: 'Your brand, your domain',
    body: 'From a branded subdomain to a full white-label portal on your own domain - own the experience.',
  },
];
