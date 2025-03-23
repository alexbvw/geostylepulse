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
  
  uploadProductImage(product_id:any, image:any){
    let url = `${this.baseUrl+this.endpoint}product-image/${product_id}`
    let token = localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'multipart/form-data');
    let body = new FormData();
    body.append('image', image);
    return firstValueFrom(this.http.request(
      `POST`,
      url,
      {headers: headers, body: body}
    ));
  }

  deleteProductImage(product:any, fileName:any){
    let url = `${this.baseUrl+this.endpoint}product-image/${product.id}/${fileName}`
    let token = localStorage.getItem('token')
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.request(
      `DELETE`,
      url,
      {headers: this.headers}
    ));
  }

  updateProduct(product:any){
    let url = `${this.baseUrl+this.endpoint}${product.id}`
    let token = localStorage.getItem('token')
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.request(
      `PUT`,
      url,
      {headers: this.headers, body: product}
      ));
  }

  deleteProduct(product_id:any){
    let url = `${this.baseUrl+this.endpoint}product/${product_id}`
    let token = localStorage.getItem('token')
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.request(
      `DELETE`,
      url,
      {headers: this.headers}
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