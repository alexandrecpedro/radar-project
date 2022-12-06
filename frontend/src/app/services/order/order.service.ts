import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Order, OrderProduct } from 'src/app/interfaces/order.interface';
import { Product } from 'src/app/interfaces/product.interface';
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
      let productUpdate:Product | undefined  =  await firstValueFrom(this.http.get<Product>(`${environment.api}/products/${product.product_id}`));
      let stockUpdate:Product | undefined = await firstValueFrom(this.http.put<Product>(`${environment.api}/products/${product.product_id}`,{
        id: productUpdate.id,
        name: productUpdate.name,
        description: productUpdate.description,
        value: productUpdate.value,
        stockQty: productUpdate.stockQty - newOrderProduct.quantity
      }))
      console.log(stockUpdate)
    })
    return newOrder; 
  }

  public async getOrder(): Promise<Order[] | undefined>{
    let orders:Order[] | undefined = await firstValueFrom(this.http.get<Order[]>(`${environment.api}/orders`));
    return orders;
  }

  public async getOrderById(id: number): Promise<{order: Order, orderProducts: OrderProduct[]} | undefined>{
    let order:Order | undefined = await firstValueFrom(this.http.get<Order>(`${environment.api}/orders/${id}`));
    let orderProduct: OrderProduct[] | undefined = await firstValueFrom(this.http.get<OrderProduct[]>(`${environment.api}/orders-products`));
    return {order, orderProducts:orderProduct.filter(product=> product.order_id==order?.id)};
  }

  public async updateOrder(order: Order, orderProducts: OrderProduct[]): Promise<{order: Order, orderProducts: OrderProduct[]} | undefined>{
    let newOrderProduct: OrderProduct[] ;
    //let orderUpdate: Order | undefined =  await firstValueFrom(this.http.put<Order>(`${environment.api}/orders/${order.id}`, order));

    orderProducts.map(async orderProduct=>{
      let update =  await firstValueFrom(this.http.put<OrderProduct>(`${environment.api}/orders-products/${orderProduct.id}`, orderProduct ))
      console.log(update);
      //newOrderProduct.push(update);
    });
    return {order, orderProducts};
  }

}
