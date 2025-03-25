import { Component } from '@angular/core';
import { RouteService } from './helper/route.service';
import { SpotService } from 'src/app/helper/spots.service';
import { AuthenticationService } from './helper/authentication.service';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
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
    private spotService: SpotService,
    public authenticationService: AuthenticationService,
    // private sseService: SseService
    ){
    this.routeService.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {window.scroll(0,0)}
        if (event instanceof NavigationEnd) {
            this.routeService.currentRoute = event.url;     
            if(this.routeService.currentRoute.includes('/product/')) this.routeService.currentRoute = '/products'
            if(this.routeService.currentRoute.includes('/service/')) this.routeService.currentRoute = '/services'
            this.routeService.currentIcon = this.routeService.navLinks.find((x:any) => x.path === this.routeService.currentRoute.replace('/', ''))?.icon
            if(this.routeService.currentRoute == '/') this.routeService.currentRoute = '/pulse', this.routeService.currentIcon = 'pulse-outline'
        }
        if (event instanceof NavigationError) {}
    });
  }

  async ngOnInit() {
    if(this.authenticationService.isLoggedIn && localStorage.getItem('stylistId')){
      await this.getStylistSpots()
    }
  }

  async getStylistSpots(){
    this.spotService.getStylistSpots()
    .then((res:any) => {
      this.spotService.spots = res.spots
      if(localStorage.getItem("currentSpot") && localStorage.getItem("currentSpot") != "null"){
        this.spotService.current_spot = JSON.parse(localStorage.getItem("currentSpot") ?? "")
        this.spotService.current_spot_name = this.spotService.current_spot.name
      }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

    
  toggleChat(){
    this.chat_active = !this.chat_active
    // this.sseService.closeEventSource()
  }

}
