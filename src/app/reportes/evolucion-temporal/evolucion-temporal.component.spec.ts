import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionTemporalComponent } from './evolucion-temporal.component';

describe('EvolucionTemporalComponent', () => {
  let component: EvolucionTemporalComponent;
  let fixture: ComponentFixture<EvolucionTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolucionTemporalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolucionTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
