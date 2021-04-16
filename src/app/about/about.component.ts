import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css','../app.component.css']
})
export class AboutComponent implements OnInit {

  text={
    p1: "Elena Pistruga is an aspiring Front-End Developer, based in Chisinau. After working for over 4 years in Executive Search, Elena has decided to pursue a career in IT because it was a dream from teenage years.",
    p2:"Before embarking on a parenthood journey, Elena worked at Pedersen & Partners where she has built a solid foundation for skills like project management, communication and time management. During maternity leave, she has been continuously learning about front-end web development.",
    p3:"In February 2020, Elena graduated Web Development course offered by Tekwill and it has provided a great starting point for exploration of front-end and back-end web development (HTML, CSS, JavaScript, PHP, Laravel, Laravel Voyager). After graduation, she became even more determined to continue her journey on the front-end vector and realised she needs more knowledge to continue her growth.",
    p4:"During her studies she has built a couple of projects, including this website, to practice what she’s learned. Some of these projects are showcased on GitHub.",
    p5:"Elena graduated Banking and Finance at Academy of Economic Studies in 2013 and this degree is going to be useful in her front-end development journey, especially for FinTech projects, should such demand arise.",
    p6:"A hands-on professional self-learner, driven by passion, fluent in Romanian, Russian, English and intermediate French.",



  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
