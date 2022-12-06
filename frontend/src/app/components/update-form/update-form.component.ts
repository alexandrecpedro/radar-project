import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit{

private clientService:ClientService = {} as ClientService;
  public client:Client = {} as Client;
  public clientbyId: Client | undefined= {} as Client;
  
  constructor(
    private router:Router,
    private routerParams: ActivatedRoute,
    private http: HttpClient
    ){}

  selectClient(cliente: Client){
    this.client = cliente;
  }

  private async getClient(id:number){
      this.clientbyId = await this.clientService.getClientbyId(id);
      if(this.clientbyId){
        this.client = this.clientbyId;
      }
      console.log(this.clientbyId);
  }


  async save(){
    if(this.client.id && this.client.id != 0){
        const update = await this.clientService.updateClient(this.client);
        this.router.navigateByUrl("clients");

    }
  }
  ngOnInit(): void {
    this.clientService = new ClientService(this.http)
    let id:number = this.routerParams.snapshot.params['id']
    if(id){
      this.getClient(id);
    }
  }
  faXmark = faXmark;
}

