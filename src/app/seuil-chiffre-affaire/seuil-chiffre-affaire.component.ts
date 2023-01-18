import { Component } from '@angular/core';

import { SeuilCaService } from '../seuil-ca.service';

@Component({
  selector: 'seuil-chiffre-affaire',
  templateUrl: './seuil-chiffre-affaire.component.html',
  styleUrls: ['./seuil-chiffre-affaire.component.scss']
})
export class SeuilChiffreAffaireComponent {
  constructor(private seuilCa: SeuilCaService) {}

  rateImpotMicro = [
    { rate: 0.01, abattement: 0.29 },
    { rate: 0.017, abattement: 0.5 },
    { rate: 0.022, abattement: 0.66 },
  ];
  activityType: string;
  quotientFamilial: number;
  revenues: number;
  maritalStatus: string;
  caSeuil: string;

  public simulateIR() {
    let params = {
      maritalStatus: this.maritalStatus,
      revenues: this.revenues,
      quotientFamilial: this.quotientFamilial,
    }
  }

  public estimateCaSeuil() {
    let rate = this.activityType === "Activite de Vente" ? this.rateImpotMicro[0].rate 
            : this.activityType === "Prestation de Service" ?  this.rateImpotMicro[1].rate 
            : this.rateImpotMicro[2].rate ;

    let abattement = this.activityType === "Activite de Vente" ? this.rateImpotMicro[0].abattement
            : this.activityType === "Prestation de Service" ?  this.rateImpotMicro[1].abattement
            : this.rateImpotMicro[2].abattement;

    let params = {
      revenuFraisPro: 0.9 * this.revenues,
      quotientFamilial: this.quotientFamilial,
      rate: rate,
      abattement: abattement
    }
            
    this.seuilCa.estimateSeuilCa(params)
      .subscribe(r => {
        this.caSeuil = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(r.caseuil)
         
      })
  }

}
