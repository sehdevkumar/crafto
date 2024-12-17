import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteUploadComponent } from './quote-upload.component';

describe('QuoteUploadComponent', () => {
  let component: QuoteUploadComponent;
  let fixture: ComponentFixture<QuoteUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
