import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  navLinks:any = [
    {
      path: 'spot',
      label: 'spot',
      icon: 'storefront-outline'
    },
    {
      path: '',
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
  currentRoute: string = '';
  currentIcon: string = '';
  constructor() { }
}
