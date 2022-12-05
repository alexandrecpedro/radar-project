import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { OrderObserverService } from 'src/app/services/order/order-observer.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit{

  constructor(
    private http:HttpClient, 
    private productService: ProductService,
    private orderObserver: OrderObserverService
  ){}
  
  products: Product[] | undefined= [];
  orderedProducts: Product[] | undefined = [];
  product: Product = {} as Product;

  ngOnInit():void{
    this.productService = new ProductService(this.http);
    this.getProducts();
  }
  private async getProducts(){
    this.products = await this.productService.getProduct();
  }

  selectProduct(product: Product){
    this.orderObserver.setProducts(product);
  }
}
