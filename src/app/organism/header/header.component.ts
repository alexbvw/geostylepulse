import { Component } from '@angular/core';
import { RouteService } from 'src/app/helper/route.service';
import { AuthenticationService } from 'src/app/helper/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public routeService: RouteService,
    public authenticationService: AuthenticationService,
    //  private spotService: spotService,
    // private sseService: SseService
    ){}
}
