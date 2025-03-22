import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { AuthenticationService } from './helper/authentication.service';
import { RouteService } from './helper/route.service';
import { spotsService } from 'src/app/helper/spots.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'geostylepulse';
 
  chat_active:boolean = false;

  constructor(
    private router: Router,
    public routeService: RouteService,
    public authenticationService: AuthenticationService,
     private spotsService: spotsService,
    // private sseService: SseService
    ){
    this.routeService.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            window.scroll(0,0)
        }

        if (event instanceof NavigationEnd) {
            this.routeService.currentRoute = event.url;     
            this.routeService.currentIcon = this.routeService.navLinks.find((x:any) => x.path === this.routeService.currentRoute.replace('/', '')).icon
            console.log(this.routeService.currentRoute)     
            console.log(this.routeService.currentIcon)     
        }

        if (event instanceof NavigationError) {

        }
    });
  }

  async ngOnInit() {
    if(this.authenticationService.isLoggedIn && localStorage.getItem('stylistId')){
      await this.getStylistSpots()
    }
  }

  async getStylistSpots(){
    this.spotsService.getStylistSpots()
    .then((res:any) => {
      console.log(res)
      this.spotsService.spots = res.spots
      if(localStorage.getItem("currentSpot") && localStorage.getItem("currentSpot") != "null"){
        this.spotsService.current_spot = JSON.parse(localStorage.getItem("currentSpot") ?? "")
      this.spotsService.current_spot_name = this.spotsService.current_spot.name
      console.log(this.spotsService.current_spot_name)
      }
    })
  }

    
  toggleChat(){
    this.chat_active = !this.chat_active
    // this.sseService.closeEventSource()
  }

}
