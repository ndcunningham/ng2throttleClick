import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Ng2ThrottleClickDirective } from './ng2-throttle-click.directive';

@Component({
  template: '<button ng2throttleClick (click)="testClick($event)">Test</button>'
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

  it('should allow click events', () => {
    buttonEl.triggerEventHandler('click', null);
    expect(component.clicks).toEqual(1);
  });
});
