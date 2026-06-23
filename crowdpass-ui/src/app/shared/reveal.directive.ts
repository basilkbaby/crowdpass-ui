import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

/**
 * Adds an `is-visible` class the first time the host element scrolls into view,
 * driving the global `[data-reveal]` transition. Optional stagger delay (ms).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    this.renderer.setAttribute(node, 'data-reveal', '');
    if (this.revealDelay) {
      this.renderer.setStyle(node, '--reveal-delay', `${this.revealDelay}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(node, 'is-visible');
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
