import { Component, Input } from '@angular/core';

/** Small library of inline, stroke-animated SVG icons used across the site. */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name) {
        @case ('ticket') {
          <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
          <path d="M14 7v10" stroke-dasharray="2 2" />
        }
        @case ('seat') {
          <path d="M5 11V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
          <path d="M4 11h16a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a1 1 0 0 1 1-1z" />
          <path d="M7 18v2M17 18v2" />
        }
        @case ('qr') {
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3M21 14v7M17 21h-3M21 18v3" />
        }
        @case ('chart') {
          <path d="M4 20V4" />
          <path d="M4 20h16" />
          <path d="M8 16l3-4 3 2 4-6" />
        }
        @case ('tag') {
          <path d="M3 11l8-8 9 9-8 8z" />
          <circle cx="7.5" cy="7.5" r="1.4" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
        }
        @case ('arrow') {
          <path d="M5 12h14M13 6l6 6-6 6" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6L6 18" />
        }
        @case ('chevron') {
          <path d="M6 9l6 6 6-6" />
        }
        @case ('check') {
          <path d="M4 12.5l5 5 11-11" />
        }
        @case ('spark') {
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        }
        @case ('shield') {
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        }
      }
    </svg>
  `,
  styles: [
    `
      :host { display: inline-flex; }
      svg path[stroke-dasharray] { animation: dash 2.4s linear infinite; }
    `,
  ],
})
export class IconComponent {
  @Input() name = 'spark';
  @Input() size = 24;
}
