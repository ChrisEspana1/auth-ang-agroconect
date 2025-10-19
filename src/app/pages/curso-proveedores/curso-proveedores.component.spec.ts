import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoProveedoresComponent } from './curso-proveedores.component';

describe('CursoProveedoresComponent', () => {
  let component: CursoProveedoresComponent;
  let fixture: ComponentFixture<CursoProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoProveedoresComponent]
    });
    fixture = TestBed.createComponent(CursoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
