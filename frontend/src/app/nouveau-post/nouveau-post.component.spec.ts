import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPostComponent } from './nouveau-post.component';

describe('NouveauPostComponent', () => {
  let component: NouveauPostComponent;
  let fixture: ComponentFixture<NouveauPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
