import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpotRevenuesComponent } from './impot-revenues.component';

describe('ImpotRevenuesComponent', () => {
  let component: ImpotRevenuesComponent;
  let fixture: ComponentFixture<ImpotRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpotRevenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpotRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
