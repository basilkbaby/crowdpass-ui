import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { EventItem } from './site-data';

/**
 * Loads event data from /public/events.json at runtime and exposes it as a
 * signal. Edit events.json to add or change events — no rebuild required.
 */
@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);

  /** All events; empty array until the JSON has loaded (or if it fails). */
  readonly events = toSignal(
    this.http.get<EventItem[]>('events.json').pipe(catchError(() => of([] as EventItem[]))),
    { initialValue: [] as EventItem[] }
  );
}
