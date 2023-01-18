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

  estimateImpRev() {
    let params = {
      maritalStatus: this.maritalStatus,
      salaires: this.salaires,
      quotientFamilial: this.quotientFamilial,
    }

    this.impotRev.estimateImpotRev(params).subscribe(r => console.log(r))
  }

}
