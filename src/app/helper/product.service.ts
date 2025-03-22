import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:any = [];
  current_product:any;
  current_product_name:any;
  productLoading = true;
  productsLoading = true;

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

  async getSpotProducts(spotId:any) {
    let url = `${this.baseUrl+this.endpoint}spot/products/${spotId}`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }

  async getProducts() {
    let url = `${this.baseUrl+this.endpoint}products?limit=50`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }

  getProduct(product_id:any) {
    let url = `${this.baseUrl+this.endpoint}product/${product_id}`
    return firstValueFrom(this.http.request(
      `GET`,
      url,
    ));
  }

  addProduct(product:any){
    let url = `${this.baseUrl+this.endpoint}products`
    let token = localStorage.getItem('token')
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.request(
      `POST`,
      url,
      {headers: this.headers,body: product}
      ));
  }

  updateProduct(product:any){
    let product_id =  localStorage.getItem("productId")
    let url = `${this.baseUrl+this.endpoint}${product_id}`
    return firstValueFrom(this.http.request(
      `PUT`,
      url,
      {body: product}
      ));
  }

  deleteProduct(product_id:any){
    let url = `${this.baseUrl+this.endpoint}product/${product_id}`
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