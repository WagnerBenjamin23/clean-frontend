import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosCreateFormComponent } from './combos-create-form.component';

describe('CombosCreateFormComponent', () => {
  let component: CombosCreateFormComponent;
  let fixture: ComponentFixture<CombosCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombosCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombosCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
