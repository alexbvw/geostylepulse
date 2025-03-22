import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/helper/authentication.service';
import { SpotsService } from '../../helper/spots.service';
import { RouteService } from 'src/app/helper/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    constructor(public router: Router, public authenticationService: AuthenticationService, public spotsService: SpotsService, public routeService: RouteService) {
      
    } 

    navigate(path:any) {
      this.router.navigate([path]);
    }
}
