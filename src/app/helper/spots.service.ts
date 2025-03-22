import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  spots:any = [];
  current_spot:any;
  current_spot_name:any;
  spotLoading = true;
  spotsLoading = true;

  name:any;
  images:any;
  radius:any;
  address:any;
  stylist_id:any;
  latitude:any;
  longitude:any;
  open_hour:any;
  close_hour:any;
  stylist_ids:any;
  customer_ids:any;
  active:boolean = false;

  endpoint = 'api/stylist/'
  baseUrl = environment.base_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    public router: Router,
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  async getStylistSpots() {
    let url = `${this.baseUrl+this.endpoint}spots/radius/${localStorage.getItem("stylistId")}`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }


  async getSpots() {
    let url = `${this.baseUrl+this.endpoint}spots?limit=50`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }

  getSpot(spot_id:any) {
    let url = `${this.baseUrl+this.endpoint}spot/${spot_id}`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }

  addSpot(spot:any){
    let url = `${this.baseUrl+this.endpoint}spots`
    let token = localStorage.getItem('token')
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.request(
      `POST`,
      url,
      {headers: this.headers,body: spot}
      ));
  }

  updateSpot(spot:any){
    let spot_id =  localStorage.getItem("spotId")
    let url = `${this.baseUrl+this.endpoint}${spot_id}`
    return firstValueFrom(this.http.request(
      `PUT`,
      url,
      {body: spot}
      ));
  }

  deleteSpot(spot_id:any){
    let url = `${this.baseUrl+this.endpoint}spot/${spot_id}`
    return firstValueFrom(this.http.request(
      `DELETE`,
      url
    ));
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      cssClass: 'toast-message',
      message: message,
      duration: 2585
    });
    toast.present();
  }

}