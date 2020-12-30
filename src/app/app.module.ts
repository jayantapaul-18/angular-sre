import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HttpHandler, HttpEvent,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SreComponent } from './components/sre/sre.component';
import { HealthcheckComponent } from './components/healthcheck/healthcheck.component';
//import { HealthDashboardComponent } from './components/health-dashboard/health-dashboard.component';
import { HttpInterceptor,InterceptorHeaders,ErrorInterceptor} from './services/http-interceptor/http-interceptor.service';


import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatButtonToggleModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatFormFieldModule
} from '@angular/material';


// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    SreComponent,
    HealthcheckComponent,
    // HealthDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorHeaders, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: ResInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }



