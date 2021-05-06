import { Component } from '@angular/core';
import { ResumeService } from './resume.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ResumeService ]
  
})

export class AppComponent {
}
