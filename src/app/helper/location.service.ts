import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  addressSelected = false;
  results:any = []
  url = environment.base_url;
  here_api_token = environment.here_token;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  selectedLocation:any;

  constructor(
    public toastController: ToastController,
    private http: HttpClient,
    public router: Router
  ) { }

  searchLocationforLatitudeAndLongitude(search:any){
    let url = `${this.url}api/stylist/address?in=countryCode:ZAF&q=${search}&apiKey=${this.here_api_token}`
    return firstValueFrom(this.http.request(
      `GET`,
      url
    ))
  }

  getLatitudeAndLongitudeforAddress(address:any){
    let url = `${this.url}api/stylist/address-details?q=${address}&apiKey=${this.here_api_token}`
    return firstValueFrom(this.http.request(
      `GET`,
      url
    ))
  }

  getLocationPromise(location_id:any) {
    let url =  `${this.url}location/${location_id}`

    return firstValueFrom(this.http.request(
      `GET`,
      url
    ))
  }

  updateLocationPromise(location:any){
    let location_id = location.ID
    location.products = []
    location.services = []
    let url =  `${this.url}location/${location_id}`
    return firstValueFrom(this.http.request(
          `PUT`,
          url,
          {body: location}
        ))
  }

}
