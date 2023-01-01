import { Component } from '@angular/core';

interface Matrix { 
  tranche: number, seuil: number, rate: number
};

class MatrixClass {
  matrix: Matrix[]
  constructor() {
    this.matrix = [
      { tranche: 10225, seuil: 0, rate: 0 },
      { tranche: 26070, seuil: 10225, rate: 0.11 },
      { tranche: 74546, seuil: 26070, rate: 0.3 },
      { tranche: 160336, seuil: 74546, rate: 0.41 },
      { tranche: 0, seuil: 160336, rate: 0.45}
    ];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isClicked: boolean = false;
  activityType: string;
  quotientFamilial: number;
  revenues: number;
  impotRevenu: number = 0;
  updatedMatrix: Matrix[];
  plafondQf = 1592;
  maritalStatus: string;

  show() {
    this.isClicked = true;
  }

tac(check) {
  console.log(check.value);
  console.log(!(this.maritalStatus === 'single'))
  this.maritalStatus = check.value;
  }

  public simulateIR(f) {
    let irQf: number, ir: number;

    let matrixQf = this.updateMatrix(this.revenues/this.quotientFamilial);
    let matrix = this.updateMatrix(this.revenues/2);
    irQf = this.estimateIr(matrixQf) * this.quotientFamilial;
    ir = this.estimateIr(matrix) * 2;
    let diminutionImpot = ir - irQf;
    let depassementSeuil = diminutionImpot - this.plafondQf * (this.quotientFamilial -2) * 2;

    if(depassementSeuil > 0) this.impotRevenu = irQf + depassementSeuil;
    else this.impotRevenu = irQf;

    console.log(this.impotRevenu)

    this.impotRevenu = 0;
  }

  private estimateIr(matrix: Matrix[]) {
    let IR: number = 0;

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