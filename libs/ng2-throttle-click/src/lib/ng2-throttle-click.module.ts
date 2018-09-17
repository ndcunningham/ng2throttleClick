
      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
import { Ng2ThrottleClickDirective } from './ng2-throttle-click.directive';
      @NgModule({
        imports: [
          CommonModule
        ],
        declarations: [Ng2ThrottleClickDirective],
        exports: [Ng2ThrottleClickDirective]
      })
      export class Ng2ThrottleClickModule { }
      