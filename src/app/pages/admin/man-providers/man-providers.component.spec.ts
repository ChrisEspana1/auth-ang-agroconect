import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManProvidersComponent } from './man-providers.component';

describe('ManProvidersComponent', () => {
  let component: ManProvidersComponent;
  let fixture: ComponentFixture<ManProvidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManProvidersComponent]
    });
    fixture = TestBed.createComponent(ManProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
