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
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from "primeng/calendar";
import {AppInterceptor} from "./service/AppInterceptor";

import {RouterModule} from "@angular/router";

import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import { FormularioComponent } from './pages/formulario/formulario.component';
import {ClientesComponent} from "./pages/clientes/clientes.component";
import {FamiliarComponent} from "./pages/familiar/familiar.component";
import {APP_ROUTING} from "./app-routing.module";
import { OtrofamiliarComponent } from './pages/otrofamiliar/otrofamiliar.component';
import { APP_INITIALIZER } from '@angular/core';
import {ConfigService} from "./service/config.service";


function initializeApp(appConfig: ConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ClientesComponent,
    FamiliarComponent,
    OtrofamiliarComponent

  ],
  imports: [
    APP_ROUTING,
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
    TableModule,
    ButtonModule,
    DialogModule,
    NgbModule,
    CalendarModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService],multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
