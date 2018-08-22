import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})



export class MovableDirective extends DraggableDirective implements OnInit {

  position: Position = {x: 0, y: 0};

  startPosition: Position;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${this.position.y}px)`);
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
    console.log('Start Moving');
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    console.log('Moving...');
  }

  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    console.log('Move End');
  }

  ngOnInit(): void {
    //   this.draggable.dragStart.subscribe(() => this.onDragStart());  // Version 1
    // }

  }

//   onDragStart(){
// console.log('Start Moving')
//   }

}
