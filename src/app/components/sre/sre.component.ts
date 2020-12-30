import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sre',
  templateUrl: './sre.component.html',
  styleUrls: ['./sre.component.css']
})
  
export class SreComponent implements OnInit {

  message = [];
  health = [];

  constructor(private HttpClient:HttpClientService) { }

  ngOnInit() {
    this.HttpClient.healthCheck().subscribe((data: any[])=>{
      console.log(data);
      this.message = data;
    })  
  }
}
