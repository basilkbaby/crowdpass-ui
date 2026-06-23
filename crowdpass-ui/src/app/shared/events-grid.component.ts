import { Component, HostListener, Input, computed, signal } from '@angular/core';
import { EventCardComponent } from './event-card.component';
import { IconComponent } from './icon.component';
import { RevealDirective } from './reveal.directive';
import { EventItem, isTour, showAction, statusLabel } from '../data/site-data';

interface Row {
  items: EventItem[];
  expanded: EventItem | null;
}

/**
 * Responsive events grid where clicking a tour card opens a FULL-WIDTH detail
 * row directly beneath that card's row (all cards stay the same fixed size).
 */
@Component({
  selector: 'app-events-grid',
  standalone: true,
  imports: [EventCardComponent, IconComponent, RevealDirective],
  templateUrl: './events-grid.component.html',
  styleUrl: './events-grid.component.scss',
})
export class EventsGridComponent {
  @Input({ required: true }) set events(value: EventItem[]) {
    this._events.set(value ?? []);
  }
  private _events = signal<EventItem[]>([]);

  /** Columns currently shown — kept in sync with the CSS breakpoints. */
  cols = signal(3);
  expandedId = signal<string | null>(null);

  // expose helpers to the template
  isTour = isTour;
  showAction = showAction;
  statusLabel = statusLabel;

  constructor() {
    this.updateCols();
  }

  @HostListener('window:resize')
  updateCols() {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    this.cols.set(w <= 620 ? 1 : w <= 980 ? 2 : 3);
  }

  /** Events chunked into rows of `cols`, each flagged if it holds the open one. */
  rows = computed<Row[]>(() => {
    const items = this._events();
    const n = this.cols();
    const expandedId = this.expandedId();
    const rows: Row[] = [];
    for (let i = 0; i < items.length; i += n) {
      const slice = items.slice(i, i + n);
      rows.push({ items: slice, expanded: slice.find((e) => e.id === expandedId) ?? null });
    }
    return rows;
  });

  toggle(event: EventItem) {
    this.expandedId.update((cur) => (cur === event.id ? null : event.id));
  }

  close() {
    this.expandedId.set(null);
  }

  citiesLabel(event: EventItem): string {
    const cities = event.shows.map((s) => s.city);
    if (cities.length <= 1) return cities[0] ?? '';
    return `${cities.slice(0, -1).join(', ')} & ${cities[cities.length - 1]}`;
  }
}
