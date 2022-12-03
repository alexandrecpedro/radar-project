import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientObserverService } from 'src/app/services/client/client-observer.service';
import { ClientService } from 'src/app/services/client/client.service';

import { faCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  constructor(
    private http:HttpClient,
    private clientObserver: ClientObserverService
    ){}

  ngOnInit(): void {
    this.clientService = new ClientService(this.http)
    this.getClients();
  }

  private clientService:ClientService = {} as ClientService;
  public clients: Client[] | undefined = [];
  public client:Client= {} as Client;

  private async getClients(){
    this.clients = await this.clientService.getClient();
  }

  create(){
    this.clientService.createClient({
      id: 0,
      name: this.client.name,
      bairro: this.client.bairro,
      cep: this.client.cep,
      cidade: this.client.cidade,
      complemento: this.client.complemento,
      cpf: this.client.cpf,
      email: this.client.email,
      estado: this.client.estado,
      phone: this.client.phone,
      logradouro: this.client.logradouro,
      numero: this.client.numero
    });
    this.getClients();
    this.clientObserver.updateQty();
  }

  async delete(client: Number){
    await this.clientService.deleteClient(client)
    this.clients = await this.clientService.getClient();
    this.clientObserver.updateQty();
  }

  selectClient(cliente: Client){
    this.client = cliente;
  }

  async save(){
    if(this.client.id && this.client.id != 0){
        const update = await this.clientService.updateClient(this.client);
        console.log(update);
    }
  }

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
}
