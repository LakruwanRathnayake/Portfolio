import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typewriter', { static: true }) typewriterElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const typewriter = new Typewriter(this.typewriterElement.nativeElement, {
        loop: true,
        delay: 75,
        deleteSpeed: 50,
      });

      typewriter
        .pauseFor(1000)
        .typeString("Software Engineer")
        .pauseFor(1000)
        .deleteAll()
        .typeString("Full Stack Developer")
        .pauseFor(1000)
        .deleteAll()
        .typeString("Cloud Architect")
        .pauseFor(1000)
        .deleteAll()
        .typeString("DevOps Engineer")
        .pauseFor(1000)
        .deleteAll()
        .typeString("AI Specialist")
        .pauseFor(1000)
        .deleteAll()
        .start();
    }
  }
}
