import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { SeuilCaService } from '../seuil-ca.service';


@Component({
  selector: 'seuil-chiffre-affaire',
  templateUrl: './seuil-chiffre-affaire.component.html',
  styleUrls: ['./seuil-chiffre-affaire.component.scss']
})
export class SeuilChiffreAffaireComponent {
  constructor(private seuilCa: SeuilCaService, @Inject(PLATFORM_ID) private platformId: Object) {}

  activityType: string;
  quotientFamilial: number;
  salaires: number;
  caSeuil: number;
  storedSeuilCA: any[] = [];
  addingRowTable: boolean = false;

  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const store = localStorage.getItem('storedSeuilCA');
      this.storedSeuilCA = store ? JSON.parse(store) : null;
   }
  }
  
  public estimateCaSeuil() {
    let params = {
      revenuFraisPro: 0.9 * this.salaires,
      quotientFamilial: this.quotientFamilial,
      activityType: this.activityType,
    }
            
    this.seuilCa.estimateSeuilCa(params)
      .subscribe(r => {

        this.caSeuil = r.caseuil;
        let storedSeuilCA = {
          quotientFamilial: this.quotientFamilial,
          salaires: this.salaires,
          caSeuil: r.caseuil,
        }

        const store = localStorage.getItem('storedSeuilCA');

        if(!store) {
          this.storedSeuilCA = [storedSeuilCA];
          localStorage.setItem('storedSeuilCA', `${JSON.stringify([storedSeuilCA])}`);
        }
        else {
          this.storedSeuilCA = [...this.storedSeuilCA, storedSeuilCA];
          localStorage.setItem('storedSeuilCA', `${JSON.stringify(this.storedSeuilCA)}`)
        }
      } )
  }

  clearStorage() {
    localStorage.clear();
    this.storedSeuilCA = null;
  }

  makeRipple() {
    this.addingRowTable = !this.addingRowTable;
    setTimeout(() => {
      this.addingRowTable = false;
  }, 300);

  }
}
