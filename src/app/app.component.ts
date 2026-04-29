import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = true;
  logoFlying = false;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.logoFlying = true;
      }, 1500);

      setTimeout(() => {
        this.isLoading = false;
      }, 2300);

      this.ngZone.runOutsideAngular(() => {
        this.initCursor();
      });
    } else {
      // On server-side, skip loading animation
      this.isLoading = false;
    }
  }

  private initCursor(): void {
    const dot = this.document.createElement('div');
    const glow = this.document.createElement('div');
    dot.className = 'cursor-dot';
    glow.className = 'cursor-glow';
    this.document.body.appendChild(dot);
    this.document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    this.document.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });

    const tick = () => {
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      glow.style.transform = `translate(${glowX - 175}px, ${glowY - 175}px)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverTargets = 'a, button, [role="button"], .project-card, .service-card, .tech-tag, .tech-pill, .filter-btn, .social-btn, .nav ul li a, .info-card, .social-btn, .btn-primary, .btn-ghost';

    this.document.addEventListener('mouseover', (e: MouseEvent) => {
      if ((e.target as Element).closest(hoverTargets)) {
        this.document.body.classList.add('cursor-hover');
      }
    });

    this.document.addEventListener('mouseout', (e: MouseEvent) => {
      if ((e.target as Element).closest(hoverTargets)) {
        this.document.body.classList.remove('cursor-hover');
      }
    });

    this.document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      glow.style.opacity = '0';
    });

    this.document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      glow.style.opacity = '1';
    });
  }
}