import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged, map, Observable, ReplaySubject, scan, startWith, switchMap, takeUntil, takeWhile } from 'rxjs';
import { TRANSITION_TEXT, TRANSITION_IMAGE_SCALE } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-client-apps',
  templateUrl: './workMdule-apps.component.html',
  styleUrls: ['./workMdule-apps.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class WorkMduleAppsComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'



  _mThreshold = 0.4


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder) {



  }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }




  /* ***************************************************************************
   *                                  other parts
   */


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mWorkModule = [

    {
     "id": "5130",
     "name": "FieldEquip - Integrations",
     "image": "assets/img/clients/Integration.png",
     "link": "https://www.fieldequip.com/integrations/",
     "tab": "Android",
     "color": "#FFFFFF"
   },
   {
    "id": "5131",
    "name": "Notification : Extended with PDF attachments",
    "image": "assets/img/clients/Notification.png",
    "link": "https://www.fieldequip.com/technician-tracking",
    "tab": "Flutter"
  },

   {
    "id": "5132",
    "name": "Technician Tracking : Journey + GPS Location",
    "image": "assets/img/clients/TechTrack.png",
    "link": "https://www.fieldequip.com/technician-tracking",
    "tab": "Flutter"
  },
  {
    "id": "5133",
    "name": "Customer Portal :  Request and Work Order",
    "image": "assets/img/clients/CustomerPortal.png",
    "link": "https://www.fieldequip.com/field-service-customer-portal-software/",
    "tab": "Android"
  }
  ];
}
