import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { environment } from '../../../environments/environments';
import { collection, doc, getDocs, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { Feed } from '../model/feed.model';

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
    private loginService: LoginService,
  ){
    this.tweetform = new FormGroup({});
    this.user$ = this.loginService.user$;
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
      text: 'hello world'
    }
    await this.loginService.addMessage(nota);
  }
}

