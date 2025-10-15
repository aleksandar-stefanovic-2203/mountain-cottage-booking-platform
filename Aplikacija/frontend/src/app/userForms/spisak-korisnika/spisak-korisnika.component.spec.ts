import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpisakKorisnikaComponent } from './spisak-korisnika.component';

describe('SpisakKorisnikaComponent', () => {
  let component: SpisakKorisnikaComponent;
  let fixture: ComponentFixture<SpisakKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpisakKorisnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpisakKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
