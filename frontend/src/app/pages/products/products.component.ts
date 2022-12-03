import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductObserverService } from 'src/app/services/product/product-observer.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private productObserver: ProductObserverService
    ){}

  ngOnInit(): void {
    this.productService = new ProductService(this.http);
    this.getProducts();
  }

  private productService: ProductService = {} as ProductService;
  public products: Product[] | undefined = [];
  public product: Product = {} as Product;

  private async getProducts(){
    this.products = await this.productService.getProduct();
  }

  create(){
    this.productService.createProduct({
      id: 0,
      name: this.product.name,
      description: this.product.description,
      stockQty: this.product.stockQty,
      value: this.product.value
    });
    this.productObserver.updateQty();
    this.getProducts();
  }
  
  async delete(product: Number){
    await this.productService.deleteProduct(product)
    this.products = await this.productService.getProduct();
    this.productObserver.updateQty();
  }

  selectProduct(producte: Product){
    this.product = producte;
  }

  async save(){
    if(this.product.id && this.product.id != 0){
        const update = await this.productService.updateProduct(this.product);
        console.log(update);
    }
  }
}
