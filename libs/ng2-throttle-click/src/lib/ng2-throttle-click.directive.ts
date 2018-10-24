import { Directive, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

/**
 * How it works
 *
 * When this directive is attached to an element and the output event is bounded
 * When the user performs a mousedown event on this element we 'throttle' when the next event should be fired
 *
 * The default is 500ms so if the user would click in quick succession this will prevent from having
 * unexpected results such as multiple events firing / calling the bound function.
 */
@Directive({
  selector: '[ng2throttleClick]',
  exportAs: 'ng2throttleClick'
})
export class Ng2ThrottleClickDirective implements OnInit {
  /**
   * Determines how long after the first click is made
   * where we should fire the next click event.
   * Currently defaults to 500 ms
   */
  @Input() time = 500;

  /**
   * Defines the events which the directive should be throttling
   */
  // @Input() throttleEvent: ThrottledEvents = ThrottledEvents.CLICK;

  /**
   * Output event for when the element is clicked
   */
  @Output() throttleClick = new EventEmitter<MouseEvent>();

  private elementClicked$ = new Subject<MouseEvent>();
  public subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.elementClicked$
      .pipe(throttleTime(this.time))
      .subscribe(event => this.throttleClick.emit(event));
  }

  /**
   * When this element is clicked (native click event) we fire our custom Click event after ensuring that the current click propagation has been stop from bubbling.
   * Currenly only supports mousedown event
   * @param event Event which is fired
   */
  @HostListener('mousedown', ['$event'])
  clickEvent(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.elementClicked$.next(event);
  }
}
