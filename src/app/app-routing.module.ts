import { NgModule } from '@angular/core';
import { Routes, RouterModule ,ExtraOptions} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SreComponent } from './components/sre/sre.component';
import { HealthcheckComponent } from './components/healthcheck/healthcheck.component';
//import { HealthDashboardComponent } from './components/health-dashboard/health-dashboard.component';

const routes: Routes = [
  { path: 'sre', component: SreComponent },
  { path: 'logs', component: SreComponent },
  { path: 'alert', component: SreComponent },
  { path: 'home', component: HomeComponent },
  { path: 'healthcheck', component: HealthcheckComponent },
  // { path: 'health-dashboard', component: HealthDashboardComponent},
  {path: 'redirect', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'tools', component: SreComponent, children: [
      {
        path: 'open',
        component: SreComponent,
      }]
  }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
