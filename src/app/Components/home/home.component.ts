import {
  Component, AfterViewInit, ElementRef, ViewChild,
  Inject, PLATFORM_ID, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typewriter', { static: true }) typewriterEl!: ElementRef;
  @ViewChild('particleCanvas', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;
  @ViewChild('profileWrap', { static: false }) profileWrap!: ElementRef;

  private rafId!: number;
  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  private destroyed = false;
  currentYear = new Date().getFullYear();

  private roles = [
    'Full Stack Developer',
    'Software Engineer',
    'Cloud Architect',
    'UI/UX Craftsman',
    'DevOps Engineer',
    'AI Enthusiast',
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initTypewriter();
    this.initParticles();
    this.initParallax();
    this.triggerEntrance();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (isPlatformBrowser(this.platformId) && this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private initTypewriter(): void {
    const el: HTMLElement = this.typewriterEl.nativeElement;
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pausing = false;

    const type = () => {
      if (this.destroyed) return;
      const current = this.roles[roleIdx];

      if (pausing) {
        pausing = false;
        setTimeout(type, deleting ? 50 : 1400);
        return;
      }

      if (!deleting) {
        el.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; pausing = true; }
        setTimeout(type, 80);
      } else {
        el.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          pausing = true;
          roleIdx = (roleIdx + 1) % this.roles.length;
        }
        setTimeout(type, 40);
      }
    };
    setTimeout(type, 800);
  }

  private initParticles(): void {
    const canvas = this.canvasEl.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(Math.floor(window.innerWidth / 12), 100);
    const colors = ['#00b7eb', '#0077a8', '#4ade80', '#ffffff'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      if (this.destroyed) return;
      const { width, height } = canvas;
      this.ctx.clearRect(0, 0, width, height);

      for (const p of this.particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fill();
      }

      this.ctx.lineWidth = 0.4;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.ctx.globalAlpha = (1 - dist / 100) * 0.12;
            this.ctx.strokeStyle = '#00b7eb';
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }

      this.ctx.globalAlpha = 1;
      this.rafId = requestAnimationFrame(draw);
    };
    draw();
  }

  private initParallax(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.destroyed) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const wrap = document.querySelector('.profile-wrap') as HTMLElement;
      if (wrap) {
        wrap.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
      }

      const orbs = document.querySelectorAll<HTMLElement>('.orb');
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 8;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    });
  }

  private triggerEntrance(): void {
    setTimeout(() => {
      document.querySelector('.home-content')?.classList.add('visible');
    }, 100);
  }


}