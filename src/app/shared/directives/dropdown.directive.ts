import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // binding the css class
  @HostBinding('class.open') isOpen = false;
  // listening for the event
  @HostListener('click')
  toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  //  dropdown can also be closed by a click anywhere outside!!!
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }
  // constructor(private elRef: ElementRef) {}
}
