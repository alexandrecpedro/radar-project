
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCirclePlus,faInfoCircle, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { ClientDialogComponent } from 'src/app/components/client-dialog/client-dialog.component';
import { ProductDialogComponent } from 'src/app/components/product-dialog/product-dialog.component';
import { Order, OrderProduct } from 'src/app/interfaces/order.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { OrderObserverService } from 'src/app/services/order/order-observer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  constructor(
    private dialogRef : MatDialog,
    public orderObserver: OrderObserverService,
    private http: HttpClient
    ){

    }

    private orderService: OrderService = {} as OrderService;
  
  faCirclePlus = faCirclePlus;
  faInfo = faInfoCircle;
  faTrashCan = faTrashCan;

  setQty: number = 0;
  date: Date = new Date();

  ngOnInit(): void{
    this.orderService = new OrderService(this.http);
  }

  openDialog(){
    this.dialogRef.open(ProductDialogComponent,{
    });
  }

  openClient(){
    this.dialogRef.open(ClientDialogComponent,{});
  }

  plusQty(product: String, qty: number){
    const index = this.orderObserver.productsOrdered.map(e=>e.product.name).indexOf(product);
    this.setQty = qty+1;
    this.orderObserver.updateProductOrdered(index, this.setQty);
  }
  minusQty(product: String, qty: number){
    if(qty==1) return
    this.setQty = qty - 1;
    const index = this.orderObserver.productsOrdered.map(e=>e.product.name).indexOf(product);
    this.orderObserver.updateProductOrdered(index, this.setQty);
  }

  delete(product: Product){
    const result = this.orderObserver.productsOrdered.filter(e=>e.product.name != product.name);
    this.orderObserver.delete(result);
  }

  save(){
    let newProductOrdered: OrderProduct[] = [];
    let newOrder: Order = {
      id: 0,
      client_id: this.orderObserver.orderClient.id,
      date: new Date(),
      total_value: this.orderObserver.sumValue()
    }
    this.orderObserver.productsOrdered.map(productOrdered =>{
      newProductOrdered.push({
        id: 0,
        product_id: productOrdered.product.id,
        order_id: 0,
        quantity: productOrdered.qty,
        value: productOrdered.product.value
      });
    });

    this.orderService.createOrder(newOrder, newProductOrdered);

  }
}
