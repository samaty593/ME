import { Component } from '@angular/core';
import { ImpotRevenuService } from './impot-revenu.service';
import { SeuilCaService } from './seuil-ca.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private seuilCa: SeuilCaService, private impotRev: ImpotRevenuService ) {}

  rateImpotMicro = [
    { rate: 0.01, abattement: 0.29 },
    { rate: 0.017, abattement: 0.5 },
    { rate: 0.022, abattement: 0.66 },
  ];
  activityType: string;
  quotientFamilial: number;
  revenues: number;
  maritalStatus: string;

  public simulateIR(f) {
    let params = {
      maritalStatus: this.maritalStatus,
      revenues: this.revenues,
      quotientFamilial: this.quotientFamilial,
    }

    this.impotRev.estimateImpotRev(params).subscribe(r => console.log(r));

    this.estimateCaSeuil();
  }

  private estimateCaSeuil() {
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
            
    this.seuilCa.estimateSeuilCa(params).subscribe(r=> console.log(r))
  }



}