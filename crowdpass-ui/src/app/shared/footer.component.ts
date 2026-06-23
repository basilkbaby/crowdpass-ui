import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="ft">
      <div class="ft__glow glow" style="background:#7c3aed"></div>
      <div class="container">
        <div class="ft__cta card">
          <div>
            <h2 class="h-section">Ready to <span class="text-grad">fill the room?</span></h2>
            <p class="lead">Launch your next event on CrowdPass and start selling tickets today.</p>
          </div>
          <a routerLink="/contact" class="btn">Get started</a>
        </div>

        <div class="ft__grid">
          <div class="ft__brand">
            <a routerLink="/" class="brand">
              <span class="brand__name">Crowd<span class="text-grad">Pass</span></span>
            </a>
            <p>Modern ticketing for events of every shape and size - across the UK and beyond.</p>
          </div>

          <div class="ft__col">
            <h4>Explore</h4>
            <a routerLink="/">Home</a>
            <a routerLink="/events">Events</a>
            <a routerLink="/about">About us</a>
            <a routerLink="/contact">Contact</a>
          </div>

          <div class="ft__col">
            <h4>Solutions</h4>
            <a routerLink="/">General admission</a>
            <a routerLink="/">Seated events</a>
            <a routerLink="/">Branded subdomain</a>
            <a routerLink="/">White-label</a>
          </div>

          <div class="ft__col">
            <h4>Get in touch</h4>
            <a href="mailto:info@crowdpass.co.uk">info&#64;crowdpass.co.uk</a>
            <span>United Kingdom</span>
          </div>
        </div>

        <div class="ft__base">
          <span>© {{ year }} CrowdPass. All rights reserved.</span>
          <div class="ft__base-links">
            <a routerLink="/">Privacy</a>
            <a routerLink="/">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year = new Date().getFullYear();
}
