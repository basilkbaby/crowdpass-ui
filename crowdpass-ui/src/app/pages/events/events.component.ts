import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { EventsGridComponent } from '../../shared/events-grid.component';
import { IconComponent } from '../../shared/icon.component';
import { EventPhase } from '../../data/site-data';
import { EventsService } from '../../data/events.service';

type View = 'all' | EventPhase;

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, RevealDirective, EventsGridComponent, IconComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  private all = inject(EventsService).events;

  view = signal<View>('all');
  filter = signal<string>('All');

  tabs: { id: View; label: string }[] = [
    { id: 'all', label: 'All events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'tba', label: 'Dates TBC' },
    { id: 'past', label: 'Past events' },
  ];

  /** Events in the currently-selected view (before the category filter). */
  private inView = computed(() => {
    const v = this.view();
    return v === 'all' ? this.all() : this.all().filter((e) => e.phase === v);
  });

  /** Category chips reflect only the categories available in the active view. */
  categories = computed(() => [
    'All',
    ...Array.from(new Set(this.inView().map((e) => e.category))),
  ]);

  visible = computed(() => {
    const cat = this.filter();
    return cat === 'All' ? this.inView() : this.inView().filter((e) => e.category === cat);
  });

  emptyMessage = computed(() => {
    switch (this.view()) {
      case 'tba':
        return 'No events awaiting dates right now — check back soon.';
      case 'past':
        return 'No past events to show yet.';
      case 'upcoming':
        return 'No upcoming events in this category — check back soon.';
      default:
        return 'No events to show right now — check back soon.';
    }
  });

  countFor(view: View): number {
    return view === 'all' ? this.all().length : this.all().filter((e) => e.phase === view).length;
  }

  setView(view: View) {
    this.view.set(view);
    this.filter.set('All'); // reset category so it always matches the new view
  }

  setFilter(category: string) {
    this.filter.set(category);
  }
}
