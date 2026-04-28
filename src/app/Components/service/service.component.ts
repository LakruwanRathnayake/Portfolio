import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {
  @ViewChild('serviceContainer') serviceContainer!: ElementRef;

  services = [
    {
      icon: '🖥️',
      title: 'Full Stack Web Development',
      description: 'End-to-end web applications built with modern Angular frontends and robust Node.js backends, optimized for performance and scalability.',
      features: [
        'Angular SPA with PrimeNG UI',
        'RESTful & GraphQL APIs',
        'Real-time features with Socket.IO',
        'Responsive & accessible design',
      ],
      tags: ['Angular', 'Node.js', 'MongoDB', 'PostgreSQL'],
    },
    {
      icon: '🏗️',
      title: 'Enterprise Software & ERP',
      description: 'Complex business platforms — estimation tools, quotation systems, and ERP integrations that automate and streamline operations at scale.',
      features: [
        'ERP-connected modules',
        'Business workflow automation',
        'Data-driven dashboards',
        'Multi-tenant architecture',
      ],
      tags: ['Microservices', 'Angular', 'Node.js', '.NET'],
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Deploying, scaling, and maintaining production applications on AWS and DigitalOcean with full CI/CD automation and container orchestration.',
      features: [
        'AWS & DigitalOcean deployments',
        'Docker containerization',
        'CI/CD with GitLab Actions',
        'Zero-downtime deployments',
      ],
      tags: ['AWS', 'Docker', 'GitLab CI/CD', 'DigitalOcean'],
    },
    {
      icon: '⚡',
      title: 'Real-time & Interactive Apps',
      description: 'Collaborative tools with live updates — from 2D CAD drawing applications to multi-user dashboards with real-time synchronization.',
      features: [
        'Socket.IO real-time sync',
        'GoJS / Three.js visualizations',
        'Interactive diagram builders',
        'Live collaboration features',
      ],
      tags: ['Socket.IO', 'GoJS', 'Three.js', 'WebSockets'],
    },
    {
      icon: '🔌',
      title: 'API Design & Integration',
      description: 'Designing clean, well-documented RESTful APIs and integrating third-party services — payment gateways, location APIs, and enterprise systems.',
      features: [
        'RESTful API architecture',
        'Third-party API integration',
        'Authentication & authorization',
        'API documentation & testing',
      ],
      tags: ['Express.js', 'REST', 'JWT', 'Swagger'],
    },
    {
      icon: '🎨',
      title: 'UI/UX Engineering',
      description: 'Translating designs into pixel-perfect, performant Angular components with smooth animations, accessibility, and mobile-first responsiveness.',
      features: [
        'Component-driven architecture',
        'CSS animations & transitions',
        'PrimeNG & custom components',
        'Cross-browser compatibility',
      ],
      tags: ['Angular', 'CSS3', 'PrimeNG', 'Figma'],
    },
  ];

  processSteps = [
    { title: 'Discover', desc: 'Understand requirements, goals, and technical constraints through detailed discussion.' },
    { title: 'Architect', desc: 'Design system architecture, select the right tech stack, and plan the delivery roadmap.' },
    { title: 'Build', desc: 'Develop iteratively with clean code, regular demos, and continuous feedback loops.' },
    { title: 'Deploy', desc: 'Ship to production with CI/CD pipelines, monitoring, and zero-downtime releases.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    const el = this.serviceContainer?.nativeElement;
    if (el) observer.observe(el);
  }
}
