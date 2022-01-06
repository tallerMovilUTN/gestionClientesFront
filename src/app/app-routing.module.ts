import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientesComponent} from "./pages/clientes/clientes.component";
import {RouterModule, Routes} from "@angular/router";
import {FamiliarComponent} from "./pages/familiar/familiar.component";
import {FormularioComponent} from "./pages/formulario/formulario.component";

const APP_ROUTES: Routes = [
  {path: '',redirectTo:'/Formulario',pathMatch:'full'},
  {path:'Formulario',component: FormularioComponent},
  {path:'Cliente',component: ClientesComponent},
  {path: 'Familiar/:id',component: FamiliarComponent},
  {path: '**',component: FormularioComponent},


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

