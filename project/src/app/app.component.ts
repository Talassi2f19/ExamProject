import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Utente } from '../app/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user: Utente = {
    username: undefined,
    email: '',
    password: ''
  }

  constructor(private loginService: LoginService){

  }

  ngOnInit(): void {
    
  }
}
