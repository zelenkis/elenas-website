import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { IResume } from '../services/resume';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css','../app.component.css'],
  providers: [ ResumeService ]

})
export class AboutComponent {
  title = "About Me";
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
