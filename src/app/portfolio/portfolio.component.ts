import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css', '../app.component.css'],
  styles: [`.odd{
    flex-direction: row-reverse !important;
    
  }
  `
]
})
export class PortfolioComponent implements OnInit {

  projects= [
    {
      "title": "Personal Website",
      "description": "My personal portfolio website for showcasing my experience, CV, as well as blog articles. Built with Angular and Bootstrap.",
      "imageUrl": "assets/images/pexels-light-coffee.jpg",
      "URL": "",
      "gitHub": "https://github.com/zelenkis/elenas-website"
    },
    {
      "title": "Textile Services MD",
      "description": "A website tailored for a family business that offers home and office textile services. The webiste consists of a landing page and a gallery view. Built with Laravel and Bootstrap.",
      "imageUrl": "assets/images/pexels-light-eucalyptus-coffee-cup.jpg",
      "URL": "#",
      "gitHub": "https://github.com/zelenkis/textileservices"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
