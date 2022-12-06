import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order/order.service';




@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private orderService: OrderService, private http: HttpClient){}
  
  public orders: Order[] | undefined= []

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';


  public barChartData: ChartData<'bar'> = {
    labels: [ 'Janeiro','Fevereiro', 'Março', 'Abril','Maio' , 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
    datasets: [
      { data: [ 45,45,45,45,45,65, 59, 80, 81, 56, 55, 40 ], label: 'Ano Anterior' },
      { data: [ 50,50,50,50,50,28, 48, 40, 19, 86, 27, 90 ], label: 'Esse Ano' }
    ]
  };


  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  public async getOrders(){
    this.orders = await this.orderService.getOrder(); 
    let thisYear:[{month: number, value: Number}] = [{}] as [{month: number, value: Number}];
    let lastYear:[{}] = [{}];
    this.orders?.map(order=>{
      let dateTeste = new Date(order.date);
      dateTeste.getFullYear() == 2022 ? thisYear.push({month: dateTeste.getMonth()+1, value: order.total_value}) : lastYear.push({month: dateTeste.getMonth()+1, value: order.total_value});
    });
    
    for(let i=0; i<thisYear.length; i++){
      
    }
 }
  
  ngOnInit(): void {
    this.orderService = new OrderService(this.http);
    this.getOrders();
  }
}