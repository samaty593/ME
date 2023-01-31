import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmatriculationComponent } from './immatriculation/immatriculation.component';

import { ImpotRevenuesComponent } from './impot-revenues/impot-revenues.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SeuilChiffreAffaireComponent } from './seuil-chiffre-affaire/seuil-chiffre-affaire.component';

const routes: Routes = [
  { path: "", component: SeuilChiffreAffaireComponent },
  { path: "seuil-chiffre-d'affaire", component: SeuilChiffreAffaireComponent },
  { path: "impot-revenues-versement-forfaitaire", component: ImpotRevenuesComponent },
  { path: "immatriculation", component: ImmatriculationComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
