import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('contactContainer') contactContainer!: ElementRef;
  @ViewChild('contactForm') contactForm!: NgForm;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;
  isLoading = false;
  isSent = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    const el = this.contactContainer?.nativeElement;
    if (el) observer.observe(el);
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.isLoading = true;

    // Simulate send — replace with real EmailJS / API call
    setTimeout(() => {
      this.isLoading = false;
      this.isSent = true;
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.submitted = false;

      // Reset sent state after 6s
      setTimeout(() => { this.isSent = false; }, 6000);
    }, 1800);
  }
}
