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
  mobileMenuOpen = false;  // ← ADD THIS

  navItems = [
    { id: 'home',      label: 'Home',      icon: 'assets/images/icons/Home.png' },
    { id: 'about',     label: 'About',     icon: 'assets/images/icons/About.png' },
    { id: 'portfolio', label: 'Portfolio', icon: 'assets/images/icons/Portfolio.png' },
    { id: 'service',   label: 'Services',  icon: 'assets/images/icons/Service.png' },
    { id: 'contact',   label: 'Contact',   icon: 'assets/images/icons/Contact.png' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

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

  // ─── ADD THESE THREE ───
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  onMobileNavClick(id: string): void {
    this.setActive(id);
    this.closeMobileMenu();
  }
}