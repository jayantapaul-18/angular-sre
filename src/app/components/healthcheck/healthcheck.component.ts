import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { Observable } from 'rxjs';


export interface PeriodicElement {
  apiName: string;
  application: string;
  message: string;
  status: number;
  upTime: number;
}


// const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.component.html',
  styleUrls: ['./healthcheck.component.css']
})


  
export class HealthcheckComponent implements OnInit{

  public output = [];
  public health: PeriodicElement[] = [];
  public healthC: PeriodicElement[] = [];
  public dataSource: PeriodicElement[];
  // public dataSource :PeriodicElement[]=[  {apiName: "api", application: 'nodejs', message: "healthy", status: 200, upTime: 12345}];
  displayedColumns: string[] = ['No','apiName', 'application', 'message', 'status','upTime','URL'];


  constructor(private HttpClient:HttpClientService) { }

  ngOnInit() {
    // this.HttpClient.sendGetRequest().subscribe((data: PeriodicElement) => {
    //   this.health.push(data);
    //   this.dataSource = Object.assign(this.health);
    //   console.log('Response = ',data);
    //   console.log('JSON Response = ', JSON.stringify(data));
    // })  

    this.HttpClient.healthCheck().subscribe((data: PeriodicElement) => {
      this.healthC.push(data);
      this.dataSource = Object.assign(this.healthC);
      console.log('Response = ',data);
      console.log('JSON Response = ', JSON.stringify(data));
    })  
  }

}



// ####################################
  // ngOnDestroy(): void {
  //   this.sub.forEach(s => s.unsubscribe());
  // }

