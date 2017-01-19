
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './mocks/in-memory-data.service';

import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent} from './hero-detail.component';
import { HeroService } from './models/hero.service';
import { HeroSearchComponent } from './models/hero-search.component';

@NgModule({
  imports:      [
     BrowserModule,
     FormsModule,
     HttpModule,
     InMemoryWebApiModule.forRoot(InMemoryDataService),
     AppRoutingModule
    ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent 
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
