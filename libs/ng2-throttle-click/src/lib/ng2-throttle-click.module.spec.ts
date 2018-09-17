
import { async, TestBed } from '@angular/core/testing';
import { Ng2ThrottleClickModule } from './ng2-throttle-click.module';

describe('Ng2ThrottleClickModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Ng2ThrottleClickModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(Ng2ThrottleClickModule).toBeDefined();
  });
});
      