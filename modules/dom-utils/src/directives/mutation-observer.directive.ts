import { Input, Output, EventEmitter, Directive, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';

/**
 * Observe mutations in the applied element. It uses MutationObserver to
 *
 * How to use?
 * ```
 * <div observe (onmutate)="onElementMutate($event)">
 * </div>
 * ```
 * If you want to specify some MutationObserver options
 * ```
 * <div [observe]="{ attributes: false, childList: true, characterData: true }" (onmutate)="onElementMutate($event)">
 * </div>
 * ```
 */

@Directive({
  selector: '[observe]'
})
export class MutationObserverDirective implements AfterViewInit, OnDestroy {
    @Input('observe') options: Object = { attributes: true/*, childList: true, characterData: true */};

    @Output('mutate') mutationEvent: EventEmitter<Object> = new EventEmitter();

    observer: any;

    constructor(private viewContainerRef: ViewContainerRef) {}

    ngAfterViewInit () {
      this.observer = new MutationObserver(mutations => {
        this.mutationEvent.emit(mutations);
      });

      this.observer.observe(this.viewContainerRef.element.nativeElement, this.options);
    }

    ngOnDestroy () {
      this.observer.disconnect();
    }

}
