import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
