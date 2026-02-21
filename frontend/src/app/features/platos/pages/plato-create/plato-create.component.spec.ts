import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoCreateComponent } from './plato-create.component';

describe('PlatoCreateComponent', () => {
  let component: PlatoCreateComponent;
  let fixture: ComponentFixture<PlatoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
