import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'CrowdPass - Sell Tickets. Fill Rooms. Own the Night.',
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then((m) => m.EventsComponent),
    title: 'Events - CrowdPass',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About - CrowdPass',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact - CrowdPass',
  },
  { path: '**', redirectTo: '' },
];
