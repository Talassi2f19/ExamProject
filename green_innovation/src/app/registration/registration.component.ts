import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: '../login/login.component.css'
})
export class RegistrationComponent implements OnInit{
  registrationform: FormGroup;

  constructor(){
    this.registrationform = new FormGroup({});
  }
  
  ngOnInit(): void {
    this.registrationform = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.registrationform);
  }
}
