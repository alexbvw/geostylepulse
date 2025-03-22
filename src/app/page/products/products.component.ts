import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/helper/product.service';
import { SpotsService } from 'src/app/helper/spots.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {

  constructor(
    public productsService: ProductsService,
    public spotsService: SpotsService
  ) {

   }

   async ionViewWillEnter() {
    this.spotsService.current_spot = await JSON.parse(localStorage.getItem("currentSpot") ?? "")
    await this.getSpotProduct()
   }

  //  async ngOnInit() {
  //    this.spotsService.current_spot = await JSON.parse(localStorage.getItem("currentSpot") ?? "")
  //    await this.getSpotProduct()
  //   }

   async getSpotProduct(){
    this.productsService.getSpotProducts(this.spotsService.current_spot.id)
    .then(async (res:any) => {
    
      for(let [productIndex, product] of res.products.entries()) {
        if(product.image_url == "") product.image_url =  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
      }

      this.productsService.products = await res.products
       console.log(this.productsService.products)
    })
    .catch((err:any) => {
      console.log(err)
    })
   }

   async ngOnDestroy () {
    this.productsService.products = []
   }

}
