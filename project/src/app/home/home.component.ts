import { Component, OnInit, inject, Injector, ViewChild, afterNextRender } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { environment } from '../../../environments/environments';
import { Timestamp, collection, doc, getDocs, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { Feed } from '../model/feed.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tweetform: FormGroup;
  user$: Observable<User | null>;
  feed: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
  ){
    this.tweetform = new FormGroup({});
    this.user$ = this.loginService.user$;
  }

  private _injector = inject(Injector);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const notesCollection = collection(db, "greeninnovation");

    this.tweetform = new FormGroup({
      text: new FormControl(null, Validators.required),
    })
    
    // Sottoscrizione agli aggiornamenti in tempo reale della collezione "greeninnovation"
    onSnapshot(notesCollection, (snapshot) => {
      console.log(this.loginService.currentUser?.uid);
      snapshot.docChanges().forEach(() => {
        this.feed = []; // Pulisce l'array prima di riempirlo con i nuovi dati
        snapshot.forEach((doc) => {
          let tmp = {
            id: doc.id,
            ...doc.data()
          }
          this.feed.push(tmp); // Aggiunge i dati del documento all'array
        });
      });
      console.log(this.feed);
    }, (error) => {
      console.error("Errore durante il recupero degli aggiornamenti:", error);
    });
  }

  onSubmit() {
    console.log(this.tweetform);
  }

  logout(){
    this.loginService.logout();
  }

  async sendMessage() {
    const nota : Feed = {
      text: this.tweetform.value.text,
    }
    await this.loginService.addMessage(nota);
    this.snackBar.open('Aggiunta feed avvenuta con successo', 'close');
  }

  protected getTimeDifference(storedTimestamp: Timestamp): string {
    // Ottieni il timestamp corrente
    const currentTimestamp = Date.now();
  
    // Calcola la differenza in millisecondi
    const timeDifference = currentTimestamp - storedTimestamp.toMillis();
  
    // Converti la differenza in secondi
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Se la differenza è inferiore a 60 secondi, mostra i secondi
    if (seconds < 60) {
      console.log(`${seconds}sec`);
      return `${seconds}sec`;
    } else if (minutes < 60) {
      console.log(`${minutes}min`);
      return `${minutes}min`;
    } else if (hours < 24) {
      console.log(`${hours}hr`);
      return `${hours}hr`;
    } else if (days < 30) {
      console.log(`${days}days`);
      return `${days}days`;
    } else if (months < 12) {
      console.log(`${months}months`);
      return `${months}months`;
    } else {
      console.log(`${years}years`);
      return `${years}years`;
    }
  }
}

