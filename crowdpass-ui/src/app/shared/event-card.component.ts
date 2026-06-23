import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { EventItem, EventShow, statusLabel } from '../data/site-data';
import { IconComponent } from './icon.component';

/**
 * A single event tile.
 *  - single show  → the whole card links out to that event's site.
 *  - tour (many shows) → a button that asks the parent grid to open a
 *    full-width detail row beneath it (see EventsGridComponent).
 */
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [IconComponent, NgTemplateOutlet],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input({ required: true }) event!: EventItem;
  /** Whether this card's detail row is currently open (for active styling). */
  @Input() expanded = false;
  /** Emitted when a tour card is clicked. */
  @Output() toggle = new EventEmitter<void>();

  get isTour(): boolean { return this.event.shows.length > 1; }
  get show(): EventShow { return this.event.shows[0]; }

  get isPast(): boolean { return this.event.phase === 'past'; }
  get isTba(): boolean { return this.event.phase === 'tba'; }

  /** Whether the single-show event can be linked straight out. */
  get singleHasLink(): boolean {
    return !this.isPast && !!this.show.url && this.show.status !== 'coming-soon';
  }

  get singleCta(): string {
    return this.isTba ? 'Register interest' : 'Visit event site';
  }

  get tourCta(): string {
    if (this.expanded) return 'Hide dates';
    return this.isPast ? 'View cities' : 'View tour dates';
  }

  /** Distinct, real city names for a tour (drops "TBC"/blank). */
  get tourCities(): string[] {
    return [...new Set(this.event.shows.map((s) => s.city).filter((c) => !!c && c !== 'TBC'))];
  }

  statusLabel = statusLabel;
}
