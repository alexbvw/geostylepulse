import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotComponent } from './spot.component';

describe('SpotComponent', () => {
  let component: SpotComponent;
  let fixture: ComponentFixture<SpotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotComponent]
    });
    fixture = TestBed.createComponent(SpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
