import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutContainer') aboutContainer!: ElementRef;

  techStack = [
    {
      label: 'Frontend',
      items: ['Angular', 'AngularJS', 'React', 'TypeScript', 'HTML5', 'CSS3', 'PrimeNG', 'GoJS', 'Three.js']
    },
    {
      label: 'Backend',
      items: ['Node.js', '.NET', 'Sails.js', 'Express.js', 'Python', 'Laravel', 'PHP']
    },
    {
      label: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'DigitalOcean', 'Docker', 'GitLab Actions', 'CI/CD', 'Vercel', 'Render']
    },
    {
      label: 'Tools',
      items: ['Git', 'GitHub', 'GitLab', 'JIRA', 'Socket.IO']
    }
  ];

  experience = [
    {
      role: 'Software Engineer',
      company: 'KIK Lanka (PVT) LTD',
      period: 'Mar 2024 – Present'
    },
    {
      role: 'Associate Software Engineer',
      company: 'KIK Lanka (PVT) LTD',
      period: 'Sept 2023 – Feb 2024'
    },
    {
      role: 'Trainee Software Engineer',
      company: 'Simato Vas Solution (PVT) LTD',
      period: 'Mar 2023 – Aug 2023'
    }
  ];

  softSkills = ['Team Collaboration', 'Problem Solving', 'Fast Learner', 'Decision Making', 'Leadership'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = this.aboutContainer?.nativeElement;
    if (el) observer.observe(el);
  }
}
