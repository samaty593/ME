import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CaSeuil {
  caseuil: number
}

@Injectable({
  providedIn: 'root'
})
export class SeuilCaService {

  constructor(private http: HttpClient) { };

    estimateSeuilCa(params) {
      return this.http.get('/.netlify/functions/caSeuil/caSeuil', {
         params: { 
          ['revenuFraisPro']: params.revenuFraisPro,
          ['quotientFamilial']: params.quotientFamilial,
          ['rate']: params.rate,
          ['abattement']:  params.abattement,
         } }
         ) as Observable<CaSeuil>
    } 
}
