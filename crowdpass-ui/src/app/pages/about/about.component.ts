import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RevealDirective, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  values = [
    { icon: 'spark', title: 'Built for organisers', body: 'Every feature starts with a real question from a real promoter, venue or producer.' },
    { icon: 'shield', title: 'Trust by default', body: 'Secure payments, QR-verified entry and reliable hosting so you can focus on the show.' },
    { icon: 'globe', title: 'Your brand first', body: 'From a branded subdomain to a full white-label portal, the spotlight stays on you.' },
    { icon: 'chart', title: 'Decisions in real time', body: 'Live sales, revenue and attendance mean you always know exactly where you stand.' },
  ];

  timeline = [
    { year: 'Day one', title: 'One simple idea', body: 'Selling tickets shouldn\'t mean wrestling with clunky tools or hidden complexity.' },
    { year: 'Growing', title: 'From standing to seated', body: 'We added interactive seating plans so theatres and concerts could go live too.' },
    { year: 'Scaling', title: 'Branded & white-label', body: 'Organisers wanted their own home - so we built subdomains and full white-label portals.' },
    { year: 'Today', title: 'One platform for every event', body: 'Club nights, conferences, banquets and tours all run on CrowdPass.' },
  ];
}
