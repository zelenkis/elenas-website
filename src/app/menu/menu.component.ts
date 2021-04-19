import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','../app.component.css']
})
export class MenuComponent implements OnInit {
  title = 'Elena Pistruga';
 
  
  constructor() { };
  

  ngOnInit() {
    
  }

}
