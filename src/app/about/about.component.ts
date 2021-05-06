import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css','../app.component.css']
})
export class AboutComponent implements OnInit {
  title = "About Me";
  aboutText={
   p1: "Elena Pistruga is an aspiring Front-End Developer, based in Chisinau. With over 4 years of working experience, she has gained hands-on project management and delivery experience as well as great communication skills in fluent English, Romanian, Russian and intermediate French.",
   p2:"During maternity leave, she has been continuously learning about front-end web development and is determined to achieve her dream of becoming a Front-End Developer.",
   p3:"Elena has completed the following courses/bootcamps:",
   listItems: ['“Web Development course” by Tekwill;', 
   '“Dynamic Front-End - JavaScript” provided by GirlsGoIT;',
   '“The Complete JavaScript Course 2021: From Zero to Expert!” online course on Udemy;',
   '“Object-Oriented Programming in JavaScript - ES6” online course on Pluralsight;',
   '“TypeScript Fundamentals” online course on Pluralsight;', 
   '“Angular - Getting Started” online course on Pluralsight.']
   

  }

  
  
  constructor() { }

  ngOnInit(): void {
  }

}
