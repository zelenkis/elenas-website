import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { IResume } from '../services/resume';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css', '../app.component.css'],
  
  
})
export class ExperienceComponent implements OnInit{

  btnWidth=250;
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
