import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpotRevenuService {

  constructor(private http: HttpClient) { }

  estimateImpotRev(params) {
    return this.http.get('/.netlify/functions/estimateImpRev/estimateImpRev', { params: {
      ['maritalStatus']: params.maritalStatus,
      ['revenues']: params.revenues,
      ['quotientFamilial']: params.quotientFamilial
    } } )
  }
}
