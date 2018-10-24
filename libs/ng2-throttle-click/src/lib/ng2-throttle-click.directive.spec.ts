import { TestBed, ComponentFixture, fakeAsync, async, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Ng2ThrottleClickDirective } from './ng2-throttle-click.directive';

@Component({
  template: '<button ng2throttleClick (throttleClick)="testClick($event)">Test</button>'
})
class TestThrottleClickComponent {
  clicks = 0;
  testClick() {
    this.clicks += 1;
  }
}

describe('Ng2ThrottleClickDirective', () => {
  let component: TestThrottleClickComponent;
  let fixture: ComponentFixture<TestThrottleClickComponent>;
  let buttonEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ng2ThrottleClickDirective, TestThrottleClickComponent]
    });

    fixture = TestBed.createComponent(TestThrottleClickComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
  });

  it('should create an instance', () => {
    const directive = new Ng2ThrottleClickDirective();
    expect(directive).toBeTruthy();
  });

  it(
    'should not allow multiple mouse down events within the default time 500ms',
    fakeAsync(() => {
      buttonEl.triggerEventHandler('mousedown', null);

      tick(1);
      fixture.detectChanges();
      expect(component.clicks).toEqual(0);

      buttonEl.triggerEventHandler('mousedown', null);
      buttonEl.triggerEventHandler('mousedown', null);

      tick(1);
      fixture.detectChanges();

      tick(498);
      fixture.detectChanges();
      expect(component.clicks).toEqual(1);
      discardPeriodicTasks();
    })
  );
});
