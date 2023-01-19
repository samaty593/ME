import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IrVfl {
  IrSansVfl: number,
  IrAvecVfl: number,
}

@Injectable({
  providedIn: 'root'
})
export class ImpotRevenuService {

  constructor(private http: HttpClient) { }

  estimateImpotRev(params) {
    return this.http.get('/.netlify/functions/estimateImpRev/estimateImpRev', { params: {
      ['maritalStatus']: params.maritalStatus,
      ['quotientFamilial']: params.quotientFamilial,
      ['salaires']: params.salaires,
      ['chiffreAffaire']: params.chiffreAffaire,
      ['activityType']: params.activityType,
    } } ) as Observable<IrVfl>
  }
}
