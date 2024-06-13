import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
