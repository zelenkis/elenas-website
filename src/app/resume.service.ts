import { Injectable } from '@angular/core';
import { IResume } from './services/resume';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";



@Injectable({
  providedIn: 'root',
}) 
export class ResumeService {

  private _resumeUrl = 'assets/api/resumeData.json';
  

  constructor(private _http: HttpClient) { }

  getResumeData(): Observable<IResume> {
    return this._http.get<IResume>(this._resumeUrl)
      .pipe(
        tap(data => console.log("From Service: " + JSON.stringify(data))),
        catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(`An Error occurred :( . ${err.message}`);
    return throwError(new Error(err.message));
  }
 
}