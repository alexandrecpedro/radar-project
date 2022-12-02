import { Component , OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(private router:Router) {}
  ngOnInit(): void {
      
  }

  public email:String = ""
  public senha:String = ""
  public mensagem:String = ""

  logar(){
    console.log(this.email)
    if(this.email === "radar@login.com" && this.senha === "12345"){
      localStorage.setItem("logado", "true")
      this.router.navigateByUrl("/home")
      
    }
    
     else{
      this.mensagem = "Usuário ou senha inválidos"
      this.email = ""
      this.senha = ""
     } 
    }    
}
