import { Component } from '@angular/core';
import { RouteService } from 'src/app/helper/route.service';
import { AuthenticationService } from 'src/app/helper/authentication.service';
import { spotsService } from 'src/app/helper/spots.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public routeService: RouteService,
    public authenticationService: AuthenticationService,
    public spotsService: spotsService,
    // private sseService: SseService
    ){

    }

    selectionChanged(data:any){
      for(let [spotIndex, spot] of this.spotsService.spots.entries()) {
        if(spot.name == data.detail.value){
          this.spotsService.current_spot = spot
        }
      }
      console.log(this.spotsService.current_spot)
    }
}
