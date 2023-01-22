import { Component } from '@angular/core';
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
  count: number = 0;
  constructor(private impotRev: ImpotRevenuService) {
    const store = localStorage.getItem('cachedIrSimulation')
    this.storedSimulation = store ? JSON.parse(store) : null;
  }

  maritalStatus?: string;
  activityType?: string;
  quotientFamilial?: number;
  salaires?: number;
  chiffreAffaire?: number;
  irSansVfl: number;
  irAvecVfl: number;
  storedSimulation: StoredSimu[] = [];

  estimateImpRev() {
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

      const store = JSON.parse(localStorage.getItem('cachedIrSimulation'));

      if(!store) {
        this.storedSimulation = [storedSimulation];
        localStorage.setItem('cachedIrSimulation', `${JSON.stringify([storedSimulation])}`);
      }
      else {
        this.storedSimulation = [...this.storedSimulation, storedSimulation];
        console.log(this.storedSimulation)
        localStorage.setItem('cachedIrSimulation', `${JSON.stringify(this.storedSimulation)}`)
      }
    })
  }

  clearData() {
    localStorage.clear();
    this.storedSimulation = [];
  }

}