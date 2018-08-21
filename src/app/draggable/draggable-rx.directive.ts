import {Directive, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {switchMap, takeUntil, repeat, take} from 'rxjs/operators';

@Directive({
  selector: '[appDraggableRx]'
})
export class DraggableRxDirective implements OnInit {


  @HostBinding('class.draggable') draggable = true;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  pointerDown = new Subject<PointerEvent>();
  pointerMove = new Subject<PointerEvent>();
  pointerUp = new Subject<PointerEvent>();

  @HostListener('pointerdown', ['event']) onPointerDown(event: PointerEvent): void {
    this.pointerDown.next(event);
  }

  @HostListener('pointermove', ['event']) onPointerMove(event: PointerEvent): void {
    this.pointerMove.next(event);
  }

  @HostListener('pointerup', ['event']) onPointerUp(event: PointerEvent): void {
    this.pointerUp.next(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    /*Stream of dragStart*/
    const dragStart$ = this.pointerDown.asObservable();

    /*let's test the stream of Observables*/
    // dragStart$.subscribe(() => {
    //   console.log('drag start stream');
    // });

    /*Stream of dragMove*/
    const dragMove$ = this.pointerDown.pipe(
      switchMap(() => this.pointerMove),
      takeUntil(this.pointerUp),
      repeat());

    /*let's test the stream of Observables*/
    dragMove$.subscribe(() => {
      // console.log('drag move stream');
    });
    /*Stream of dragEnd*/
    const dragEnd$ = this.pointerDown.pipe(
      switchMap(() => this.pointerUp),
      take(1),
      repeat()
      );

    /*let's test the stream of Observables*/
    // dragEnd$.subscribe(() => {
    //   console.log('drag end stream');
    // });
  }


}
