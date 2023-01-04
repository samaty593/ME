import { Component } from '@angular/core';
import { SeuilCaService } from './seuil-ca.service';

interface Matrix { 
  tranche: number, seuil: number, rate: number
};

class MatrixClass {
  mBase = [0, 10777, 27478, 78570, 168994]
  matrix: Matrix[];
  constructor() {
    this.matrix = [
      { tranche: this.mBase[1], seuil: this.mBase[0], rate: 0 },
      { tranche: this.mBase[2], seuil: this.mBase[1], rate: 0.11 },
      { tranche: this.mBase[3], seuil: this.mBase[2], rate: 0.3 },
      { tranche: this.mBase[4], seuil: this.mBase[3], rate: 0.41 },
      { tranche: 0, seuil: this.mBase[4], rate: 0.45}
    ];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private seuilCa: SeuilCaService ) {}

  rateImpotMicro = [
    { rate: 0.01, abattement: 0.29 },
    { rate: 0.017, abattement: 0.5 },
    { rate: 0.022, abattement: 0.66 },
  ];
  activityType: string;
  quotientFamilial: number;
  revenues: number;
  revenuFraisPro: number;
  updatedMatrix: Matrix[];
  plafondQf = 1678;
  maritalStatus: string;
  seuilCaC: number;

  public simulateIR(f) {
    let irQf: number, ir: number;
    let qfParent: number = (this.maritalStatus === "married" || this.maritalStatus === "pacsed") ? 2 : 1;
    this.revenuFraisPro = 0.9 * this.revenues;

    irQf = this.estimateIr(this.revenuFraisPro / this.quotientFamilial) * this.quotientFamilial;
    ir = this.estimateIr(this.revenuFraisPro / qfParent) * qfParent;

    let diminutionImpot = ir - irQf;
    let depassementSeuil = diminutionImpot - this.plafondQf * (this.quotientFamilial - qfParent) * 2;

    this.estimateCaSeuil();

    if(depassementSeuil > 0) return irQf + depassementSeuil;
    return irQf;

  }

  private estimateCaSeuil() {
    let rate = this.activityType === "Activite de Vente" ? this.rateImpotMicro[0].rate 
            : this.activityType === "Prestation de Service" ?  this.rateImpotMicro[1].rate 
            : this.rateImpotMicro[2].rate ;

    let abattement = this.activityType === "Activite de Vente" ? this.rateImpotMicro[0].abattement
            : this.activityType === "Prestation de Service" ?  this.rateImpotMicro[1].abattement
            : this.rateImpotMicro[2].abattement;

    let params = {
      revenuFraisPro: this.revenuFraisPro,
      quotientFamilial: this.quotientFamilial,
      rate: rate,
      abattement: abattement
    }
            
    this.seuilCa.estimateSeuilCa(params).subscribe(r=> console.log(r))
  }

  private estimateIr(revenues) {
    let IR: number = 0;
    let matrix = this.updateMatrix(revenues);

    matrix.forEach(item => {
      IR += (item.tranche - item.seuil) * item.rate;
    })

    return IR;
  }

  private updateMatrix(revenues: number) {
    const updatedMatrix = new MatrixClass().matrix;
    const lenghtN = updatedMatrix.length; 

     for(let i = 0; i < lenghtN; i++) {
       const item = updatedMatrix[i];
     
       if(revenues < item.tranche && i <= lenghtN - 2) {
          updatedMatrix[i].tranche = revenues;
          updatedMatrix.splice(i+1, lenghtN - i -1);
         break;
       }
       if(revenues > item.tranche && i === lenghtN - 2){
          updatedMatrix[i+1].tranche = revenues;
         break;
       };
     };

     return updatedMatrix;
  }

}