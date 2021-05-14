import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { IResume } from '../services/resume';

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
  title ="Projects";
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
