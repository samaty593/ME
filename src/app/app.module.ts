import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImpotRevenuService } from './impot-revenu.service';
import { ImpotRevenuesComponent } from './impot-revenues/impot-revenues.component';
import { SeuilCaService } from './seuil-ca.service';
import { SeuilChiffreAffaireComponent } from './seuil-chiffre-affaire/seuil-chiffre-affaire.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ImmatriculationComponent } from './immatriculation/immatriculation.component';

@NgModule({
  declarations: [
    AppComponent,
    SeuilChiffreAffaireComponent,
    ImpotRevenuesComponent,
    PagenotfoundComponent,
    ImmatriculationComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [SeuilCaService, ImpotRevenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
