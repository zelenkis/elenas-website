import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css', '../app.component.css']
})
export class IntroComponent implements OnInit {
  
  resumeInfo:any = {
    "basics": {
        "name": "Elena Pistruga",
        "label": "Developer",
        "picture": "./assets/images/Lenke.jpg",
        "email": "elena.pistruga@gmail.com",
        "phone": "",
        "website": "",
        "summary": "I am Elena - an aspiring Front-End Developer, passionate about Angular and Web Technologies!",
        "location": {
            "city": "Chisinau",
            "country": "Republic of Moldova",
            "countryCode": "MD"
        },
        "profiles": [
            {
                "network": "Linkedin",
                "url": "https://www.linkedin.com/in/elenapistruga"
            }
        ]
    },
    "work": [
        {
            "company": "Pedersen & Partners",
            "position": "Research Associate, Europe & APAC",
            "website": "http://pedersenandpartners.com",
            "startDate": "September 2014",
            "endDate": "January 2018",
            "summary": "Description..."
        },
        {
            "company": "Pedersen & Partners",
            "position": "Research Analyst ",
            "website": "http://pedersenandpartners.com",
            "startDate": "September 2013",
            "endDate": "September 2014",
            "summary": "Description..."
        }
    ],
    "education": [
        {
            "institution": "Academy of Economic Studies of Moldova",
            "area": "Finance and Banking",
            "studyType": "Bachelor",
            "startDate": "September 2010",
            "endDate": "May 2013",
            "courses": [
                {
                    "institution": "Tekwill",
                    "title": "Web Development",
                    "endDate": "February 2020",
                    "summary": "Description..."
                },
                {
                    "institution": "Udemy",
                    "title": "The Complete JavaScript Course 2021: From Zero to Expert! by Jonas Schmedtmann",
                    "endDate": "October 2020",
                    "summary": "Description..."
                },
                {
                    "institution": "Pluralsight",
                    "title": "Angular Getting Started by Deborah Kurata",
                    "endDate": "March 2021",
                    "summary": "Description..."
                },
                {
                    "institution": "Pluralsight",
                    "title": "Object-oriented Programming in JavaScript - ES6 by Mark Zamoyta",
                    "endDate": "February 2021",
                    "summary": "Description..."
                },
                {
                    "institution": "Pluralsight",
                    "title": "TypeScript Fundamentals by John Papa and Dan Wahlin",
                    "endDate": "February 2021",
                    "summary": "Description..."
                }
            ]
        }
    ],
    "skills": [
        {
            "keywords": [
                "HTML",
                "CSS",
                "Bootstrap",
                "Javascript",
                "TypeScript",
                "Angular",
                "GitHub",
                "PHP",
                "Laravel",
                "Laravel Voyager"
            ]
        }
    ],
    "languages": [
        {
            "language": "Romanian",
            "fluency": "Native"
        },
        {
            "language": "Russian",
            "fluency": "Native"
        },
        {
            "language": "English",
            "fluency": "Fluent"
        },
        {
            "language": "French",
            "fluency": "Upper Intermediate (B2)"
        }
    ]
}

  constructor(){
   
  }

  ngOnInit(): void {
    
  }

}
