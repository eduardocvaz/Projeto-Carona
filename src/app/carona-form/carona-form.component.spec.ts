import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaronaFormComponent } from './carona-form.component';

describe('CaronaFormComponent', () => {
  let component: CaronaFormComponent;
  let fixture: ComponentFixture<CaronaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaronaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaronaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
