import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/helper/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    navLinks:any = [
      {
        path: 'spot',
        label: 'spot',
        icon: 'locate-outline'
      },
      {
        path: 'pulse',
        label: 'pulse',
        icon: 'pulse-outline'
      },
      {
        path: 'products',
        label: 'products',
        icon: 'pricetags-outline'
      },
      {
        path: 'services',
        label: 'services',
        icon: 'cut-outline'
      },
      {
        path: 'bookings',
        label: 'bookings',
        icon: 'today-outline'
      },
      {
        path: 'orders',
        label: 'orders',
        icon: 'push-outline'
      }
    ]

    constructor(public authenticationService: AuthenticationService) { 

    }
}
