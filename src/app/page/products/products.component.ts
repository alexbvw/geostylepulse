import { SpotsService } from 'src/app/helper/spots.service';
import { ProductsService } from 'src/app/helper/product.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {
  @ViewChild("file", {static: false}) file: ElementRef | any = [];
  files: any  = [];  
  fileToUpload: File | null = null;
  constructor(
    private routerService: Router,
    public spotsService: SpotsService,
    public productsService: ProductsService,
  ) {

   }

   async ionViewWillEnter() {
    this.spotsService.current_spot = await JSON.parse(localStorage.getItem("currentSpot") ?? "")
    await this.getSpotProducts()
   }

   async getSpotProducts(){
    this.productsService.getSpotProducts(this.spotsService.current_spot.id)
    .then(async (res:any) => {
      for(let [productIndex, product] of res.products.entries()) {
        if(product.image_url == "" || product.image_url == null) product.image_url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
      }
      this.productsService.products = await res.products
      console.log(this.productsService.products)
    })
    .catch((err:any) => {
      console.log(err)
    })
   }

   async selectImage(product:any) { 
    const fileUpload = this.file.nativeElement;
    fileUpload.onchange = async (res: any) => {  
      // console.log(res.target.files[0]);
      await this.uploadImage(product, res.target.files[0]);
    };  
    fileUpload.click();  
  }
  
  async uploadImage(product:any, file: any) {
    this.productsService.uploadProductImage(product.id, file)
    .then(async (res:any) => {
      console.log(res)
      await this.getSpotProducts()
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  async deleteImage(product:any){
    let fileName = product.image_url.split('/').pop();
    this.productsService.deleteProductImage(product, fileName)
    .then(async (res:any) => {
      console.log(res)
      await this.getSpotProducts()
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  async deleteProduct(product:any){
    this.productsService.deleteProduct(product.id)
    .then(async (res:any) => {
      console.log(res)
      await this.getSpotProducts()
      await this.productsService.presentToast(res.message)
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  async editProduct(product:any){
   await this.routerService.navigate([`product/${product.name.replace(/\s+/g, '-').toLowerCase()}`]);
  }

   async ngOnDestroy () {
    this.productsService.products = []
   }

}
