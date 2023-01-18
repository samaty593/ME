import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilChiffreAffaireComponent } from './seuil-chiffre-affaire.component';

describe('SeuilChiffreAffaireComponent', () => {
  let component: SeuilChiffreAffaireComponent;
  let fixture: ComponentFixture<SeuilChiffreAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuilChiffreAffaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeuilChiffreAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
