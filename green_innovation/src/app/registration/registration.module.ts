import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RegistrationComponent } from './registration.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
