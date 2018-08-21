import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  isDragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  constructor() {
  }

  // Drag Events
  //   pointerdown => dragstart
  //  document=> pointermove => dragMove
  //  document=> pointerup => dragEnd
  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    this.isDragging = true;
    this.dragStart.emit(event);
    // console.log('drag start');
  }

  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    } else {
      this.dragMove.emit(event);
      // console.log('drag move');
    }
  }

  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    } else {
      this.isDragging = false;
      this.dragEnd.emit(event);
      // console.log('drag end');
    }
  }

}
