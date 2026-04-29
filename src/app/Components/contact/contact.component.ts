import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('contactContainer') contactContainer!: ElementRef;
  @ViewChild('contactForm') contactForm!: NgForm;

  // ✅ Replace these with your actual EmailJS credentials
  private SERVICE_ID = 'service_j1cxaf2';   // ✅ already have this
  private TEMPLATE_ID = 'template_781naq9';   // paste here
  private PUBLIC_KEY = '_2YpCr_jRv0ivjZC9';       // paste here

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;
  isLoading = false;
  isSent = false;
  isError = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      }),
      { threshold: 0.1 }
    );
    const el = this.contactContainer?.nativeElement;
    if (el) observer.observe(el);
  }

  onSubmit(): void {
    this.submitted = true;
    this.isError = false;

    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.isLoading = true;

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      subject: this.formData.subject || 'Portfolio Contact',
      message: this.formData.message,
      to_email: 'rathnayakelakruwan321@gmail.com'
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(() => {
        this.isLoading = false;
        this.isSent = true;
        this.formData = { name: '', email: '', subject: '', message: '' };
        this.submitted = false;

        setTimeout(() => { this.isSent = false; }, 6000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        this.isLoading = false;
        this.isError = true;

        setTimeout(() => { this.isError = false; }, 5000);
      });
  }
}