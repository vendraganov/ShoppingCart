import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceholderDirective]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
