import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/helper/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  constructor(public productService: ProductService) { }

  async ionViewWillEnter() {
    if (this.productService.current_product == null) this.productService.current_product = await JSON.parse(localStorage.getItem("currentProduct") ?? "")
    await this.getProduct(this.productService.current_product.id)
  }

  async getProduct(product_id:any) {
    this.productService.getProduct(product_id)
    .then(async (res:any) => {
      console.log(res)
      this.productService.current_product = await res?.product;
      if(this.productService.current_product?.image_url == "" ||this.productService.current_product?.image_url == null) this.productService.current_product.image_url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

}
