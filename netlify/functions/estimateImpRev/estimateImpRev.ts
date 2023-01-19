import { Handler, HandlerEvent } from '@netlify/functions'

interface Matrix { 
    tranche: number, seuil: number, rate: number
  };
  
  class MatrixClass {
    mBase = [0, 10777, 27478, 78570, 168994];
    rateImpotMicro = [
      { rate: 0.01, abattement: 0.29 },
      { rate: 0.017, abattement: 0.5 },
      { rate: 0.022, abattement: 0.66 },
    ];
    matrix: Matrix[];
    rate: number;
    abattement: number;
    qfParent: number;
    plafondQf: number = 1678;



    constructor( activityType, maritalStatus) {
      this.matrix = [
        { tranche: this.mBase[1], seuil: this.mBase[0], rate: 0 },
        { tranche: this.mBase[2], seuil: this.mBase[1], rate: 0.11 },
        { tranche: this.mBase[3], seuil: this.mBase[2], rate: 0.3 },
        { tranche: this.mBase[4], seuil: this.mBase[3], rate: 0.41 },
        { tranche: 0, seuil: this.mBase[4], rate: 0.45}
      ];

      this.rate = activityType === "Activite de Vente" ? this.rateImpotMicro[0].rate 
        : activityType === "Prestation de Service" ?  this.rateImpotMicro[1].rate 
        : this.rateImpotMicro[2].rate;

      this.abattement = activityType === "Activite de Vente" ? this.rateImpotMicro[0].abattement
        : activityType === "Prestation de Service" ?  this.rateImpotMicro[1].abattement
        : this.rateImpotMicro[2].abattement;
      
      this.qfParent  = (maritalStatus === "married" || maritalStatus === "pacsed") ? 2 : 1;
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

  estimateIr(revenues) {
    let IR: number = 0;
    let matrix = this.updateMatrix(revenues);

    matrix.forEach(item => {
      IR += (item.tranche - item.seuil) * item.rate;
    })

    return IR;
  }

  estimateIrQfCapped(revenues, quotientFamilial) {
    let irQf = this.estimateIr(revenues / quotientFamilial) * quotientFamilial;
    let ir = this.estimateIr(revenues / this.qfParent) * this.qfParent;
  
    let diminutionImpot = ir - irQf;
    let depassementSeuil = diminutionImpot - this.plafondQf * (+quotientFamilial - this.qfParent) * 2;
    let IR = (depassementSeuil > 0) ? irQf + depassementSeuil: irQf;

    return IR
  }
  
}

export const handler: Handler = async (event: HandlerEvent) => {
  const { maritalStatus, quotientFamilial, salaires, chiffreAffaire, activityType }  = event.queryStringParameters;

  const matrix = new MatrixClass(activityType, maritalStatus);

 try {
  let revenuFraisPro = 0.9 * +salaires;
  let abattementCA = ((1 - matrix.abattement)  *  +chiffreAffaire) > 305 ? (matrix.abattement * +chiffreAffaire) : 305;
  let revenuTotal = revenuFraisPro + abattementCA;

  let IrSansVfl = matrix.estimateIrQfCapped(revenuTotal, +quotientFamilial);
  let IrAvecVfl = matrix.estimateIrQfCapped(+salaires, +quotientFamilial) + matrix.rate * +chiffreAffaire;

  return {
    statusCode: 200,
    body: JSON.stringify({
      IrSansVfl: IrSansVfl,
      IrAvecVfl: IrAvecVfl,
    }),
  } 
 } catch(err) {
        return {
          statusCode: 500,
          body: err.toString()
        }
 }
}
