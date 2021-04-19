import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css']
})
export class ContactComponent implements OnInit {
  title = "Contact Me";

  contacts = {
    "email": {
        "emailAdress": "elena.pistruga@gmail.com",
        "icon": "fas fa-envelope"
    },
    "linkedin":
    {
        "linkedinUrl": "https://www.linkedin.com/in/elenapistruga",
        "icon": "fab fa-linkedin-in"
    },
    "telegram":
    {
        "telegramUrl": "https://t.me/hellen_pi",
        "icon": "fab fa-telegram-plane"
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
