import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { IResume } from '../services/resume';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css', '../app.component.css']
})
export class SkillsComponent implements OnInit {

  btnCursor="default";
  btnColor="#667D60";
  errorMessage!: string;
  resumeData!: IResume;

  constructor(private _resumeService: ResumeService){}
    
  ngOnInit(): void {

    this._resumeService.getResumeData()
                          .subscribe(resumeData => {
                            this.resumeData = resumeData;
                          }, error => this.errorMessage = <any>error);
  } 

}
