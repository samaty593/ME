import { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  // const { revenuFraisPro, quotientFamilial, rate, abattement }  = event.queryStringParameters

  // let caSeuil = 0.11 * (revenuFraisPro - quotientFamilial*10777)/(rate - abattement*0.11);
  // caSeuil = caSeuil < 0 ? 0 : caSeuil;

  console.log(event.queryStringParameters)

  return {
    statusCode: 200,
    body: JSON.stringify({
      // message: `Seuil de Chiffre d'Affaire, ${caSeuil}`,
    }),
  }
}
