import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Order, OrderProduct } from 'src/app/interfaces/order.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public async createOrder(order: Order, orderProduct: OrderProduct[] ): Promise<Order | undefined>{
    let newOrder:Order | undefined = await firstValueFrom(this.http.post<Order>(`${environment.api}/orders`, order));
    orderProduct.map(async product=>{
      let newOrderProduct: OrderProduct | undefined = await firstValueFrom(this.http.post<OrderProduct>(`${environment.api}/orders-products`, {
        id: 0,
        order_id: newOrder?.id,
        product_id: product.product_id,
        value: product.value,
        quantity: product.quantity
      }));
      console.log(newOrderProduct);
    })

    return newOrder; 
  }

  public async getOrder(): Promise<Order[] | undefined>{
    let orders:Order[] | undefined = await firstValueFrom(this.http.get<Order[]>(`${environment.api}/orders`));
    return orders;
  }

}
