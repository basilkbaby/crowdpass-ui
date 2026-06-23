import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { IconComponent } from '../../shared/icon.component';
import { EventsGridComponent } from '../../shared/events-grid.component';
import { FEATURES, TIERS } from '../../data/site-data';
import { EventsService } from '../../data/events.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective, IconComponent, EventsGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private eventsService = inject(EventsService);

  features = FEATURES;
  tiers = TIERS;
  previewEvents = computed(() =>
    this.eventsService.events().filter((e) => e.phase !== 'past').slice(0, 10)
  );

  marquee = [
    'Club nights', 'Theatre', 'Conferences', 'Comedy', 'Concerts',
    'Workshops', 'Banquets', 'Networking', 'Festivals', 'Galas',
  ];

  steps = [
    { n: '01', title: 'Build your page', body: 'Add your event, set ticket types and (optionally) design a seating plan in minutes.' },
    { n: '02', title: 'Share & sell', body: 'Publish on your own subdomain or portal and start taking secure payments instantly.' },
    { n: '03', title: 'Scan & manage', body: 'Check guests in with QR codes and watch sales, revenue and attendance update live.' },
  ];
}
