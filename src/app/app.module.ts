import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './utils/custom-adapter';
import { CustomDateParserFormatter } from './utils/custom-date-parser-formatter';
import {CalendarModule} from "primeng/calendar";
import {AppInterceptor} from "./service/AppInterceptor";



@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    NgbModule,
    CalendarModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
