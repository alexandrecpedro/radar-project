import { Component } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {

private clientService:ClientService = {} as ClientService;
  public clients: Client[] | undefined = [];
  public client:Client= {} as Client;

  selectClient(cliente: Client){
    this.client = cliente;
  }

  async save(){
    if(this.client.id && this.client.id != 0){
        const update = await this.clientService.updateClient(this.client);
        console.log(update);
    }
  }

  faXmark = faXmark;
}

