import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  name: string;
  description: string;
  image: string;
  type: string;
  tags: string[];
  category: 'professional' | 'personal';
  year: string;
  github?: string;
  live?: string;
  filter: string[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioContainer') portfolioContainer!: ElementRef;

  activeFilter = 'all';

  filterTabs = [
    { label: 'All Projects', value: 'all' },
    { label: 'Professional', value: 'professional' },
    { label: 'Personal', value: 'personal' },
    { label: 'Full Stack', value: 'fullstack' },
  ];

  projects: Project[] = [
    {
      name: '2D Electrical Panel Drawing App',
      description: 'Interactive CAD-style application for electrical panel design with real-time collaboration, GoJS diagrams, Socket.IO live updates, and Python computation engine.',
      image: 'assets/images/projects/project2d-estimation.png',
      type: 'CAD / Real-time',
      tags: ['Angular', 'Node.js', 'GoJS', 'Three.js', 'Socket.IO', 'Python'],
      category: 'professional',
      year: '2024',
      filter: ['professional', 'fullstack'],
    },
    {
      name: 'Temperature Rise Software',
      description: 'Engineering tool for thermal analysis of electrical enclosures with complex mathematical computations and PDF report generation for KIK Lanka.',
      image: 'assets/images/projects/temperature.png',
      type: 'Engineering Tool',
      tags: ['Angular 11', 'Sails.js', 'PostgreSQL'],
      category: 'professional',
      year: '2024',
      filter: ['professional', 'fullstack'],
    },
    {
      name: 'Matheesha Flour Mill ERP',
      description: 'Full-stack ERP dashboard for flour mill operations — real-time revenue, cost & profit analytics, inventory tracking, sales management, and live data visualizations.',
      image: 'assets/images/projects/Flour_meal_ERP.png',
      type: 'ERP Dashboard',
      tags: ['Angular', 'Node.js', 'MongoDB', 'Express.js', 'Vercel'],
      category: 'personal',
      year: '2023',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
    {
      name: 'ChatBOT Messaging App',
      description: 'Real-time chat application with contact list, threaded conversations, unread badge counts, and Socket.IO-powered live messaging.',
      image: 'assets/images/projects/chat-app.png',
      type: 'Real-time Chat',
      tags: ['Angular', 'Node.js', 'Socket.IO', 'MongoDB'],
      category: 'personal',
      year: '2023',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
    {
      name: 'Food Mine — Food Ordering',
      description: 'Food delivery platform with category filters, search, cart management, and a photo-rich product grid. Angular frontend with Node.js backend.',
      image: 'assets/images/projects/foodmine.png',
      type: 'E-Commerce',
      tags: ['Angular', 'Node.js', 'MongoDB'],
      category: 'personal',
      year: '2023',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
    {
      name: 'The Fit Club — Gym Website',
      description: 'Modern fitness center landing page with program showcases, membership plans, testimonials, animated stats, and a fully responsive layout.',
      image: 'assets/images/projects/gym-article.png',
      type: 'Landing Page',
      tags: ['React', 'CSS3', 'JavaScript'],
      category: 'personal',
      year: '2023',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
    {
      name: 'EagleEye Location Tracker',
      description: 'Mobile location tracking app built for the Appmaker platform using the Dialog location tracker API with mobile number integration and map history views.',
      image: 'assets/images/projects/location-tracker.png',
      type: 'Mobile / Location',
      tags: ['Angular', 'Sails.js', 'MongoDB', 'Dialog API'],
      category: 'professional',
      year: '2023',
      filter: ['professional', 'fullstack'],
    },
    {
      name: 'Lucky Collection — E-Commerce',
      description: 'Full-featured e-commerce store with product listings, categories, cart, and checkout. Clean UI with product image grids and Buy Now functionality.',
      image: 'assets/images/projects/shop-ecom.png',
      type: 'E-Commerce',
      tags: ['Angular', 'Node.js', 'MongoDB'],
      category: 'personal',
      year: '2022',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
    {
      name: 'Differential Equations Solver',
      description: 'Web application to solve differential equations with text or image formula input. Python backend for computation, Laravel for API management.',
      image: 'assets/images/projects/differential.png',
      type: 'Math Tool',
      tags: ['Angular', 'Python', 'Laravel', 'MySQL'],
      category: 'personal',
      year: '2022',
      github: 'https://github.com/LakruwanRathnayake',
      filter: ['personal', 'fullstack'],
    },
  ];

  portfolioStats = [
    { value: '9+', label: 'Projects Shipped' },
    { value: '3+', label: 'Years Experience' },
    { value: '5+', label: 'Tech Stacks' },
    { value: '2', label: 'Companies' },
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.filter.includes(this.activeFilter));
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

  setFilter(value: string): void {
    this.activeFilter = value;
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    const el = this.portfolioContainer?.nativeElement;
    if (el) observer.observe(el);
  }
}