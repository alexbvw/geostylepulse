import { Spot } from 'src/app/model/spot';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { SpotsService } from 'src/app/helper/spots.service';
import { ProductsService } from 'src/app/helper/product.service';
import { LocationService } from 'src/app/helper/location.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})

export class AddModalComponent  {

  addType = localStorage.getItem('addType');
  address = new FormControl('');

  spot: Spot = {
    name: '',
    latitude: 0,
    longitude: 0,
    address: '',
    images: [],
    open_hour: new Date().toISOString().split('T')[1],
    close_hour: new Date().toISOString().split('T')[1],
    active: false,
    radius: 10
  }

  product: Product = {
    spot_id: '',
    price: 0,
    in_stock: false,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
    stock_count: 0,
    name: '',
    category: '',
    description: ''
  }



  constructor(
    private routerService: Router,
    private modalCtrl: ModalController,
    public spotsService: SpotsService,
    public productsService: ProductsService,
    private popOverCtrl: PopoverController,
    public locationService: LocationService,
  ) { }

  ionViewWillEnter() {
    console.log(this.addType)
    this.address.valueChanges.subscribe(async (value: any) => {
      console.log(value);
      if (value.length > 3 && value != this.spot.address) {
        await this.searchAddress(value);
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel'), this.popOverCtrl.dismiss();
  }

  async confirm() {
    if(this.addType == "spot") await this.addSpot(this.spot)
    if(this.addType == "product") this.product.spot_id = this.spotsService.current_spot?.id ?? "", await this.addProduct(this.product)
    return this.modalCtrl.dismiss('submit'), this.popOverCtrl.dismiss();
  }

  async addSpot(spot:any){    
    this.spotsService.addSpot(spot)
    .then(async (res:any) => {
      this.spotsService.presentToast(res.message)
      this.modalCtrl.dismiss('confirm');
      this.popOverCtrl.dismiss();
      console.log(res)
      spot["id"] = res.id
      localStorage.setItem("currentSpot", JSON.stringify(spot))
      await this.getStylistSpots()
    })
    .catch((err:any) => {
      console.log(err)
      this.spotsService.presentToast(err.error.message)
    })
  }

  async getStylistSpots(){
    this.spotsService.getStylistSpots()
    .then((res:any) => {
      console.log(res)
      this.spotsService.spots = res.spots
      if(localStorage.getItem("currentSpot") && localStorage.getItem("currentSpot") != "null"){
        this.spotsService.current_spot = JSON.parse(localStorage.getItem("currentSpot") ?? "")
      this.spotsService.current_spot_name = this.spotsService.current_spot.name
      console.log(this.spotsService.current_spot_name)
      }
    })
  }

  async addProduct(product:any){
    this.productsService.addProduct(product)
    .then(async (res:any) => {
      this.productsService.presentToast(res.message)
      this.modalCtrl.dismiss('confirm');
      this.popOverCtrl.dismiss();
      console.log(res)
      await this.getSpotProducts();
    })
    .catch((err:any) => {
      console.log(err)
      this.productsService.presentToast(err.error.message)
    })
  }

  async getSpotProducts(){
    this.productsService.getSpotProducts(this.spotsService.current_spot.id)
    .then(async (res:any) => {
      for(let [productIndex, product] of res.products.entries()) {
        if(product.image_url == "" || product.image_url == null) product.image_url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
      }
      this.productsService.products = await res.products
      this.routerService.navigate(['products'])
    })
    .catch((err:any) => {
      console.log(err)
    })
   }

  async searchAddress(address:any){
    this.locationService.searchLocationforLatitudeAndLongitude(address)
      .then(async (res:any) => {
        console.log(res)
        this.locationService.results = await res?.items;
      })
      .catch((err:any) => {
        console.log(err)
      })
  }

  async selectLocation(location:any){
    console.log(location)
    this.locationService.results = []
    await this.locationService.getLatitudeAndLongitudeforAddress(location)
    .then(async (res:any) => {
      console.log(res)
     if(res.items.length){
       this.locationService.selectedLocation = await res.items[0]
       this.spot.latitude = await this.locationService.selectedLocation.position.lat
       this.spot.longitude = await this.locationService.selectedLocation.position.lng
       this.spot.address = await this.locationService.selectedLocation.address.label
       this.address.setValue(await this.locationService.selectedLocation.address.label)
       this.locationService.addressSelected = true;
     }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

}
