import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageRentComponent } from './cottage-rent.component';

describe('CottageRentComponent', () => {
  let component: CottageRentComponent;
  let fixture: ComponentFixture<CottageRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CottageRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CottageRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
