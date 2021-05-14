import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { IBasics, IResume } from '../services/resume';
import { ResumeService } from '../resume.service';
import { Observable } from 'rxjs';

@Component({ 
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css', '../app.component.css'],

})

export class IntroComponent implements OnInit{

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
