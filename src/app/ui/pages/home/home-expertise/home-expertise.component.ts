import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }

    }

    )
  }

  _mTools = [

     //backend
    {
      "id": "5131",
      "name": "Java",
      "logo": "assets/img/tools/java.png",
      "link": "https://dev.java/playground/",
      "tab": "back-end"
    },
   
    {
      "id": "9112",
      "name": "JavaScript",
      "logo": "assets/img/tools/javascript.png",
      "link": "http://square.github.io/retrofit/",
      "tab": "back-end"
    },
    
    {
      "id": "9110",
      "name": "Python",
      "logo": "assets/img/tools/python.png",
      "link": "https://www.python.org/",
      "tab": "back-end",
      "color": "#3DDC84"
    },

    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },

    //framework
    {
      "id": "5131",
      "name": "Spring Boot",
      "logo": "assets/img/tools/spring.png",
      "link": "https://spring.io/projects/spring-boot",
      "tab": "framework"
    },
    {
      "id": "9113",
      "name": "Maven",
      "logo": "assets/img/tools/Maven.png",
      "link": "https://maven.apache.org/",
      "tab": "framework"
    },
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },

    // database
    {
      "id": "5132",
      "name": "Mongo DB",
      "logo": "assets/img/tools/mongo.png",
      "link": "https://www.mongodb.com/",
      "tab": "database"
    },
    {
      "id": "5133",
      "name": "MySql",
      "logo": "assets/img/tools/mysql.png",
      "link": "https://www.mysql.com/",
      "tab": "database"
    },

    // CI/CD
    {
      "id": "9114",
      "name": "Docker",
      "logo": "assets/img/tools/Docker.png",
      "link": "https://www.docker.com/",
      "tab": "CI/CD",
      "color": "#42A5F5"
    },
    {
      "id": "9115",
      "name": "Jenkins",
      "logo": "assets/img/tools/Jenkins.png",
      "link": "https://www.jenkins.io/",
      "tab": "CI/CD"
    },

    // other

    {
      "id": "8102",
      "name": "Microservices",
      "logo": "assets/img/tools/Microservices.svg",
      "link": "",
      "tab": "other"
    },

    {
      "id": "8103",
      "name": "File Zilla",
      "logo": "assets/img/tools/filezilla.png",
      "link": "",
      "tab": "other"
    },
    
    {
      "id": "4101",
      "name": "GIT",
      "logo": "assets/img/tools/git.png",
      "link": "https://git-scm.com/",
      "tab": "other"
    },
    {
      "id": "9116",
      "name": "Redis Caching",
      "logo": "assets/img/tools/redis.png",
      "link": "https://redis.io/",
      "tab": "android"
    },

    //cloud
    {
      "id": "5134",
      "name": "AWS",
      "logo": "assets/img/tools/aws.png",
      "link": "https://docs.aws.amazon.com/ec2/?nc2=h_ql_doc_ec2",
      "tab": "cloud",
      "color": "#42A5F5"
    },

    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud"
    },

    { 
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },

    {
      "id": "6124",
      "name": "Google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },
  ]
}
