
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Stylist } from '../model/stylist';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userId:any;
  stylistId:any;
  decoded:any;
  StylistInfo:any;
  stylistDecode:any;
  currentStylist = {};
  baseUrl = environment.base_url;
  endpoint = 'api/stylist/'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    public router: Router,
    private http: HttpClient,
    public toastController: ToastController
  ) { this.isLoggedIn }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      cssClass: 'toast-message',
      message: message,
      duration: 2585
    });
    toast.present();
  }

  //Register Stylist with Stylist Role

  register(stylist: Stylist) {
    let api = `${this.baseUrl + this.endpoint}register`;
    return firstValueFrom(this.http.post<any>(api, stylist))
  }

  login(stylist:any) {
    let api = `${this.baseUrl + this.endpoint}login`;
    return firstValueFrom(this.http.post<any>(api, stylist));
  }

  //Get JWT TOKEN from localstorage
  getToken(){
    return localStorage.getItem('token');
  }

  //Check if Stylist is Logged in 
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  //Logout Stylist
  logout(){
    let removeToken = localStorage.removeItem('token');
    if(removeToken == null) {
      this.router.navigate(['authenticate']);
      localStorage.clear();
    }
  }
  
}
