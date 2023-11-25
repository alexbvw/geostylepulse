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
        label: 'Spot',
        icon: 'locate-outline'
      },
      {
        path: 'pulse',
        label: 'Pulse',
        icon: 'pulse-outline'
      },
      {
        path: 'products',
        label: 'Products',
        icon: 'pricetags-outline'
      },
      {
        path: 'services',
        label: 'Services',
        icon: 'cut-outline'
      },
      {
        path: 'bookings',
        label: 'Bookings',
        icon: 'today-outline'
      },
      {
        path: 'orders',
        label: 'Orders',
        icon: 'push-outline'
      }
    ]

    constructor(public authenticationService: AuthenticationService) { 

    }
}
