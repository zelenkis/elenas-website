import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css']
})
export class ContactComponent implements OnInit {
  title = "Contact Me";

  contacts = {
    email: {
        address: "elena.pistruga@gmail.com",
        icon: "fas fa-envelope"
    },
    linkedIn:
    {
        url: "https://www.linkedin.com/in/elenapistruga",
        account: "elenapistruga",
        icon: "fab fa-linkedin-in"
    },
    telegram:
    {
        url: "https://t.me/hellen_pi",
        account: "hellen_pi",
        icon: "fab fa-telegram-plane"
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
