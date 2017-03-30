import { Directive, ViewContainerRef, Input } from "@angular/core";
/**
 * Add specified classes if the provided media query selector matches
 *
 * How to use?
 * ```
 * <div [mediaQueryClass]="{'(min-width: 768px)': 'class1,class2,class3', '(min-width: 576px) and (max-width: 768px)': 'visible'}">
 * </div>
 * ```
 */
@Directive({
  selector: '[mediaQueryClass]', 
  inputs: ['mediaQueryClass']
})
export class MediaQueryClassDirective {
  private prevCondition: boolean = null;

  private data : Array<{
    mql: MediaQueryList,
    mqlListener?: (mql: MediaQueryList) => void,
    prevCondition: boolean
  }> = [];
  // private mqlListeners: Array<(mql: MediaQueryList) => void>;   // reference kept for cleaning up in ngOnDestroy()

  constructor(private viewContainer: ViewContainerRef) {}

  /**
   * Called whenever the media query input value changes.
   */
  set mediaQueryClass(mediaQueries: any) {
    for (let media in mediaQueries) {
      this.listenToMedia(media, mediaQueries[media].split(','));
    }
  }

  ngOnDestroy() {
    this.data.forEach((data) => {
      data.mql.removeListener(data.mqlListener);
      data.mql = data.mqlListener = null;
    });

    this.data = null;
  }

  private listenToMedia (mediaQuery: string, classes: [string]) {
    let mql: MediaQueryList = window.matchMedia(mediaQuery);
    let data = {
      mql: mql,
      prevCondition: false,
      classes: classes
    };

    let pos = this.data.push(data);

    let mqlListener: (mql: MediaQueryList) => void = 
    (mq) => {
      this.onMediaMatchChange(mq.matches, data);
    };


    data['mqlListener'] = mqlListener;

    /* Register for future events */
    mql.addListener(mqlListener);

    this.onMediaMatchChange(mql.matches, data);
  }

  private onMediaMatchChange(matches: boolean, data: any) {
    // this has been taken verbatim from NgIf implementation
    if (matches && !data.prevCondition) {
      data.prevCondition = true;
      this.attachClasses(data.classes);
    } else if (!matches && data.prevCondition) {
      data.prevCondition = false;
      this.removeClasses(data.classes);
    }
  }

  private attachClasses (classes: Array<string>)  {
    classes.forEach(className => {
      jQuery(this.viewContainer.element.nativeElement).addClass(className);
    });
  }

  private removeClasses (classes: Array<string>) {
    classes.forEach(className => {
      jQuery(this.viewContainer.element.nativeElement).removeClass(className);
    });
  }
}