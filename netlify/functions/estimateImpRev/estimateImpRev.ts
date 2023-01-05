import { Handler, HandlerEvent } from '@netlify/functions'

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

     estimateIr(revenues) {
      let IR: number = 0;
      let matrix = this.updateMatrix(+revenues);
  
      matrix.forEach(item => {
        IR += (item.tranche - item.seuil) * item.rate;
      })
  
      return IR;
    }

     
   updateMatrix(revenues) {
    const updatedMatrix: Matrix[] = this.matrix;
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

export const handler: Handler = async (event: HandlerEvent) => {
  const { maritalStatus, revenues, quotientFamilial }  = event.queryStringParameters;
  let plafondQf = 1678;
  const matrix = new MatrixClass()

 try {
  let qfParent: number = (maritalStatus === "married" || maritalStatus === "pacsed") ? 2 : 1;
  let revenuFraisPro = 0.9 * +revenues;

  let irQf = matrix.estimateIr(revenuFraisPro / +quotientFamilial) * +quotientFamilial;
  let ir = matrix.estimateIr(revenuFraisPro / qfParent) * qfParent;

  let diminutionImpot = ir - irQf;
  let depassementSeuil = diminutionImpot - plafondQf * (+quotientFamilial - qfParent) * 2;
  
  let IR = (depassementSeuil > 0) ? irQf + depassementSeuil: irQf;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Seuil de Chiffre d'Affaire, ${IR}`,
    }),
  }
 } catch(err) {
        return {
          statusCode: 500,
          body: err.toString()
        }
 }
}
