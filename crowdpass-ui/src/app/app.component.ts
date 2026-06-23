import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main><router-outlet /></main>
    <app-footer />
  `,
  styles: [
    `
      main { display: block; min-height: 60vh; }
    `,
  ],
})
export class AppComponent {}
