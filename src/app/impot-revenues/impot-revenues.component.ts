import { Component } from '@angular/core';
import { ImpotRevenuService } from '../impot-revenu.service';

@Component({
  selector: 'impot-revenues',
  templateUrl: './impot-revenues.component.html',
  styleUrls: ['./impot-revenues.component.scss']
})
export class ImpotRevenuesComponent {
  constructor(private impotRev: ImpotRevenuService) {}

  maritalStatus: string;
  activityType: string;
  quotientFamilial: number;
  salaires: number;
  chiffreAffaire: number;
  irSansVfl: string;
  irAvecVfl: string;

  estimateImpRev() {
    let params = {
      maritalStatus: this.maritalStatus,
      quotientFamilial: this.quotientFamilial,
      salaires: this.salaires,
      chiffreAffaire: this.chiffreAffaire,
      activityType: this.activityType,
    }

    this.impotRev.estimateImpotRev(params).subscribe(r => {
      this.irSansVfl = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(r.IrSansVfl);
      this.irAvecVfl = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(r.IrAvecVfl);
    })
  }

}
