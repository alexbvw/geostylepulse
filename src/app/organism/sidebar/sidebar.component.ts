import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/helper/authentication.service';
import { spotsService } from '../../helper/spots.service';
import { RouteService } from 'src/app/helper/route.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    constructor(public authenticationService: AuthenticationService, public spotsService: spotsService, public routeService: RouteService) {
      
    } 

}
