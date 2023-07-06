import { Handler, HandlerEvent } from '@netlify/functions'

class MatrixClass {
  rateImpotMicro = [
    { rate: 0.01, abattement: 0.29 },
    { rate: 0.017, abattement: 0.5 },
    { rate: 0.022, abattement: 0.66 },
  ];
  rate: number;
  abattement: number;

  constructor(activityType) {
    this.rate = activityType === "Activite de Vente" ? this.rateImpotMicro[0].rate 
      : activityType === "Prestation de Service" ?  this.rateImpotMicro[1].rate 
      : this.rateImpotMicro[2].rate ;

    this.abattement = activityType === "Activite de Vente" ? this.rateImpotMicro[0].abattement
      : activityType === "Prestation de Service" ?  this.rateImpotMicro[1].abattement
      : this.rateImpotMicro[2].abattement;
  }
}
export const handler: Handler = async (event: HandlerEvent) => {
  const { revenuFraisPro, quotientFamilial, activityType  }  = event.queryStringParameters;
  const matrix = new MatrixClass(activityType);

 try {

  let caSeuil: number = 0.11 * (+revenuFraisPro - +quotientFamilial*10777)/(matrix.rate - matrix.abattement*0.11);
  caSeuil = +caSeuil.toFixed(0);
  caSeuil = caSeuil < 0 ? 0 : caSeuil;

  return {
    statusCode: 200,
    body: JSON.stringify({
      caseuil: caSeuil,
    }),
  }
 } catch(err) {
        return {
          statusCode: 500,
          body: err.toString()
        }
 }
}
