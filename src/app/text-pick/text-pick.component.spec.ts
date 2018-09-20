import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPickComponent } from './text-pick.component';

describe('TextPickComponent', () => {
  let component: TextPickComponent;
  let fixture: ComponentFixture<TextPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
