import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: String = "";
  public senha: String = "";
  public mensagem: String = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    console.log(this.email)
    if (this.email === "radar@login.com" && this.senha === "12345") {
      localStorage.setItem("logged", "true");
      this.router.navigateByUrl("/");
    }

    else {
      this.mensagem = "Usuário ou senha inválidos"
      this.email = ""
      this.senha = ""
    }
  }
}
