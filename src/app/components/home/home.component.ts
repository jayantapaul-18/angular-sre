import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = [];

  constructor(private dataService: DataService) { }

  
    formatLabel(value: number) {
      if (value >= 100) {
        return Math.round(value / 1) + '%';
      }
  
      return value;
    }

  firstPage() {
    console.log("firstPage");
  }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.message = data;
    })  
  }

}