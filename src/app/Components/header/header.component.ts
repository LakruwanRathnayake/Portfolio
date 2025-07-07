import { Component, HostListener , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeSection = 'home';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sectionIds = ['home', 'about', 'portfolio', 'service', 'contact'];
    for (let id of sectionIds) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          this.activeSection = id;
          break;
        }
      }
    }
  }
}
