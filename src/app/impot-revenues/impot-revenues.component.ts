import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { ImpotRevenuService } from '../impot-revenu.service';


interface StoredSimu {
  quotientFamilial: number,
  salaires: number,
  chiffreAffaire: number,
  irSansVfl: number,
  irAvecVfl: number,
}

@Component({
  selector: 'impot-revenues',
  templateUrl: './impot-revenues.component.html',
  styleUrls: ['./impot-revenues.component.scss']
})
export class ImpotRevenuesComponent {
  constructor(private impotRev: ImpotRevenuService, @Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const store = localStorage.getItem('storedIrSimulation');
      this.storedSimulation = store ? JSON.parse(store) : null;
    }
  }

  maritalStatus?: string;
  activityType?: string;
  quotientFamilial?: number;
  salaires?: number;
  chiffreAffaire?: number;
  irSansVfl: number;
  irAvecVfl: number;
  storedSimulation: StoredSimu[] = [];
  addingRowTable: boolean = false;

  public estimateImpRev() {
    let params = {
      quotientFamilial: this.quotientFamilial,
      salaires: this.salaires,
      chiffreAffaire: this.chiffreAffaire,
      maritalStatus: this.maritalStatus,
      activityType: this.activityType,
    }
  
    this.impotRev.estimateImpotRev(params).subscribe(r => {
      this.irSansVfl = r.IrSansVfl;
      this.irAvecVfl = r.IrAvecVfl;

      let storedSimulation = {
        quotientFamilial: this.quotientFamilial,
        salaires: this.salaires,
        chiffreAffaire: this.chiffreAffaire,
        irSansVfl: this.irSansVfl,
        irAvecVfl: this.irAvecVfl,
      };

      const store = JSON.parse(localStorage.getItem('storedIrSimulation'));

      if(!store) {
        this.storedSimulation = [storedSimulation];
        localStorage.setItem('storedIrSimulation', `${JSON.stringify([storedSimulation])}`);
      }
      else {
        this.storedSimulation = [...this.storedSimulation, storedSimulation];
        localStorage.setItem('storedIrSimulation', `${JSON.stringify(this.storedSimulation)}`)
      }
    })
  }

  public clearData() {
    localStorage.clear();
    this.storedSimulation = [];
  }

  public makeRipple() {
    this.addingRowTable = !this.addingRowTable;
    setTimeout(() => {
      this.addingRowTable = false;
  }, 300);

  }

}
