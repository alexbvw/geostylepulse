import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  currentRoute: string = '';
  constructor() { }
}
