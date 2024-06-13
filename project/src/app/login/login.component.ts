import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginform: FormGroup;
  user$: Observable<User | null>;

  constructor(
    private loginService: LoginService,
  ){
    this.user$ = this.loginService.user$;
    this.loginform = new FormGroup({});
  }
  
  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    console.log(this.loginform);
  }

  loginGoogle() {
    this.loginService.loginGoogle();
  }
  
  loginDefault() {
    this.loginService.loginDefault(this.loginform.value.email, this.loginform.value.password);
  }
}
