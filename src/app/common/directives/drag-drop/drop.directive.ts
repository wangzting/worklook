import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appDroppable]',
})
export class DropDirective {

  @Input() dragEnterClass = '';

  constructor(
    private el: ElementRef,
    private rd: Renderer2
  ) {
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  // @HostListener('dragover', ['$event'])
  // onDragOver(ev: Event) {
  //   if (this.el.nativeElement === ev.target) {
  //     this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
  //   }
  // }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener('drag', ['$event'])
  onDrag(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
}
