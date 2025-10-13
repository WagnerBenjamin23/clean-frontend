import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosItemComponent } from './combos-item.component';

describe('CombosItemComponent', () => {
  let component: CombosItemComponent;
  let fixture: ComponentFixture<CombosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombosItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
