import { Handler, HandlerEvent } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent) => {
  const { revenuFraisPro, quotientFamilial, rate, abattement }  = event.queryStringParameters;
  
 try {

  let caSeuil = 0.11 * (+revenuFraisPro - +quotientFamilial*10777)/(+rate - +abattement*0.11);
  caSeuil = caSeuil < 0 ? 0 : caSeuil;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Seuil de Chiffre d'Affaire, ${caSeuil}`,
    }),
  }
 } catch(err) {
      console.log(err);
        return {
          statusCode: 500,
          body: err.toString()
        }
 }
}
