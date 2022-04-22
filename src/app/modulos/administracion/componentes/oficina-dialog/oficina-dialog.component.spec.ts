import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinaDialogComponent } from './oficina-dialog.component';

describe('OficinaDialogComponent', () => {
  let component: OficinaDialogComponent;
  let fixture: ComponentFixture<OficinaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OficinaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
