import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeSection = 'home';
  isScrolled = false;

  navItems = [
    { id: 'home',      label: 'Home',      icon: '⌂' },
    { id: 'about',     label: 'About',     icon: '◈' },
    { id: 'portfolio', label: 'Portfolio', icon: '◉' },
    { id: 'service',   label: 'Services',  icon: '◆' },
    { id: 'contact',   label: 'Contact',   icon: '◎' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isScrolled = window.scrollY > 30;

    const sectionIds = this.navItems.map(n => n.id);
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  setActive(id: string): void {
    this.activeSection = id;
  }
}