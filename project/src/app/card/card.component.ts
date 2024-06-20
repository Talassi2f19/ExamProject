import { Component, Input } from '@angular/core';
import { Feed } from '../model/feed.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() user: string = "";
  @Input() time: string = "";
  @Input() data: Feed = {
    text: '',
  };
}
