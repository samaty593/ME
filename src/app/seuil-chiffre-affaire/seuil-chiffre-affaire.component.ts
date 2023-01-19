import { Component } from '@angular/core';

import { SeuilCaService } from '../seuil-ca.service';

@Component({
  selector: 'seuil-chiffre-affaire',
  templateUrl: './seuil-chiffre-affaire.component.html',
  styleUrls: ['./seuil-chiffre-affaire.component.scss']
})
export class SeuilChiffreAffaireComponent {
  constructor(private seuilCa: SeuilCaService) {}


  activityType: string;
  quotientFamilial: number;
  revenues: number;
  caSeuil: string;

  public estimateCaSeuil() {
    let params = {
      revenuFraisPro: 0.9 * this.revenues,
      quotientFamilial: this.quotientFamilial,
      activityType: this.activityType,
    }
            
    this.seuilCa.estimateSeuilCa(params)
      .subscribe(r => {
        this.caSeuil = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(r.caseuil)
         
      })
  }

}
