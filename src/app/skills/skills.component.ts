import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css', '../app.component.css']
})
export class SkillsComponent implements OnInit {

  btnCursor="default";
  btnColor="#667D60";
  skillsInfo = {
    "skills": [
      {
          "title": "HTML",
          "icon": "fab fa-html5"
      },
      {
        "title": "CSS",
        "icon": "fab fa-css3-alt"
      },

      {
        "title": "Bootstrap",
        "icon": "fab fa-bootstrap"
      },

      {
        "title": "JavaScript",
        "icon": "fab fa-js-square"
      },

      {
        "title": "TypeScript",
        
      },

      {
        "title": "Angular",
        "icon": "fab fa-angular"
      },

      {
        "title": "GitHub",
        "icon": "fab fa-github-square"
      },

      {
        "title": "npm",
        "icon": "fab fa-npm"
      },

      {
        "title": "PHP",
        "icon": "fab fa-php"
      },

      {
        "title": "Laravel",
        "icon": "fab fa-laravel"
      },

      {
        "title": "Laravel Voyager",
        "icon": "fas fa-dharmachakra"
      },
   
      {
        "title": "Visual Studio Code"
      },

      {
        "title": "Adobe Photoshop"
      },

    ]
  }
  
         
  constructor() { }

  ngOnInit(): void {
  }

}
