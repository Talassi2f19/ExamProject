import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tweetform: FormGroup;
  user$: Observable<User | null>;

  constructor(
    private loginService: LoginService,
  ){
    this.tweetform = new FormGroup({});
    this.user$ = this.loginService.user$;
  }

  ngOnInit(): void {
    this.tweetform = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
    console.log(this.loginService);
  }

  onSubmit() {
    console.log(this.tweetform);
  }

  logout(){
    this.loginService.logout();
  }
}
