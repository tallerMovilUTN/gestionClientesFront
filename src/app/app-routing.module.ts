import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientesComponent} from "./pages/clientes/clientes.component";
import {RouterModule, Routes} from "@angular/router";
import {FamiliarComponent} from "./pages/familiar/familiar.component";
import {FormularioComponent} from "./pages/formulario/formulario.component";
import {OtrofamiliarComponent} from "./pages/otrofamiliar/otrofamiliar.component";

const APP_ROUTES: Routes = [
  {path: '',component: FormularioComponent},
  {path:'Formulario',component: FormularioComponent},
  {path:'Cliente',component: ClientesComponent},
  {path: 'Familiar/:id',component: FamiliarComponent},
  {path: 'OtroFamiliar',component: OtrofamiliarComponent},
  {path: 'OtroFamiliar/:id',component: OtrofamiliarComponent}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);




/**@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{ useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
**/

