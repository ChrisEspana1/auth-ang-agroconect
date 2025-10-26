import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaridadVsContenidoComponent } from './claridad-vs-contenido.component';

describe('ClaridadVsContenidoComponent', () => {
  let component: ClaridadVsContenidoComponent;
  let fixture: ComponentFixture<ClaridadVsContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaridadVsContenidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaridadVsContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
