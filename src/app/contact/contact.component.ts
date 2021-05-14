import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { IContacts, IResume } from '../services/resume';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
  providers: [ ResumeService ]

})
export class ContactComponent implements OnInit {
  title = "Contact Me";

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


