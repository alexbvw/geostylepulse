import { Component } from '@angular/core';
// import { spotService } from './services/spot.service';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { AuthenticationService } from './helper/authentication.service';
import { RouteService } from './helper/route.service';

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
    //  private spotService: spotService,
    // private sseService: SseService
    ){
    this.routeService.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            window.scroll(0,0)
        }

        if (event instanceof NavigationEnd) {
            this.routeService.currentRoute = event.url;     
            console.log(this.routeService.currentRoute)     
        }

        if (event instanceof NavigationError) {

        }
    });
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn && localStorage.getItem('uuid')){
      // this.spotService.getspot(localStorage.getItem('uuid'))
    }
  }

    
  toggleChat(){
    this.chat_active = !this.chat_active
    // this.sseService.closeEventSource()
  }

}
