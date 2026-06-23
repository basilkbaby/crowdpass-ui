import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RevealDirective } from '../../shared/reveal.directive';
import { IconComponent } from '../../shared/icon.component';

/**
 * Free email delivery via Web3Forms (https://web3forms.com) — no backend required.
 *
 * SETUP (one step):
 *   1. Go to https://web3forms.com, enter the inbox you want enquiries sent to
 *      (e.g. info@crowdpass.co.uk) and you'll be emailed a free Access Key.
 *   2. Paste that key below. That's it — submissions land in your inbox.
 *
 * The form keeps working with no signup limits on the free plan.
 */
const WEB3FORMS_ACCESS_KEY = '9b31b7ba-6199-4ea8-991a-4f7c397a5608';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  sent = signal(false);
  sending = signal(false);
  error = signal<string | null>(null);

  model = {
    name: '',
    email: '',
    organisation: '',
    interest: 'General admission',
    message: '',
  };

  interests = [
    'General admission',
    'Seated event',
    'Branded subdomain',
    'White-label platform',
    'Something else',
  ];

  channels = [
    { icon: 'spark', label: 'Email us', value: 'info@crowdpass.co.uk', href: 'mailto:info@crowdpass.co.uk' },
    { icon: 'globe', label: 'Based in', value: 'United Kingdom', href: null },
  ];

  async submit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
      return;
    }

    this.sending.set(true);
    this.error.set(null);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New CrowdPass enquiry — ${this.model.interest}`,
          from_name: 'CrowdPass website',
          name: this.model.name,
          email: this.model.email,
          organisation: this.model.organisation || '—',
          interest: this.model.interest,
          message: this.model.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        this.sent.set(true);
      } else {
        this.error.set(data?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      this.error.set('Could not reach the server. Please try again, or email us directly.');
    } finally {
      this.sending.set(false);
    }
  }

  reset() {
    this.model = { name: '', email: '', organisation: '', interest: 'General admission', message: '' };
    this.sent.set(false);
    this.error.set(null);
  }
}
