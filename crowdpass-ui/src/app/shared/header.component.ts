import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="hdr" [class.scrolled]="scrolled()">
      <div class="container hdr__inner">
        <a routerLink="/" class="brand" (click)="close()">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <rect width="32" height="32" rx="9" fill="url(#bg)" />
              <path d="M8 12.5a3.5 3.5 0 0 0 0 7h16a3.5 3.5 0 0 0 0-7H8z" fill="#fff" opacity=".95" />
              <circle cx="16" cy="16" r="1.4" fill="#7c3aed" />
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="32" y2="32">
                  <stop stop-color="#8b5cf6" />
                  <stop offset="1" stop-color="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="brand__name">Crowd<span class="text-grad">Pass</span></span>
        </a>

        <nav class="nav" [class.open]="open()" aria-label="Primary">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="close()">Home</a>
          <a routerLink="/events" routerLinkActive="active" (click)="close()">Events</a>
          <a routerLink="/about" routerLinkActive="active" (click)="close()">About</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="close()">Contact</a>
          <a routerLink="/contact" class="btn nav__cta" (click)="close()">
            Start selling
          </a>
        </nav>

        <button class="burger" [class.open]="open()" (click)="toggle()" aria-label="Toggle menu" [attr.aria-expanded]="open()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  scrolled = signal(false);
  open = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 16);
  }

  toggle() { this.open.update((v) => !v); }
  close() { this.open.set(false); }
}
