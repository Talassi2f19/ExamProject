import { Injectable, inject } from '@angular/core';
import { Auth, User, GoogleAuthProvider, user, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../login/dialog/dialog.component';
import { Feed } from '../model/feed.model';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  private provider = new GoogleAuthProvider();
  readonly dialog = inject(MatDialog);

  router: Router = inject(Router);

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  private openSnackbar(message: string){
    this.snackBar.open(message, 'close');
  }

  loginGoogle() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/', 'home']);
      return credential;
    })
    .catch((error) => {
      console.warn(error);
      this.openSnackbar('Errore nell\'effettuare l\'accesso tramite Google ');
  })
  }

  loginDefault(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then(credential => {
      this.router.navigate(['/', 'home']);
      console.log(credential);
      return credential;
    })
    .catch((error) => {
      console.warn(error);
      this.openDialog(email, password)
    })
  }

  private openDialog(email: string, password: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.signUpDefault(email, password);
        this.openSnackbar('Account non esistente: registrazione effettuata con successo');
      }
    });
  }

  private signUpDefault(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((credential) => {
      this.router.navigate(['/', 'home']);
      console.log(credential);
      return credential;
    })
    .catch((error) => {
      console.warn(error);
      this.openSnackbar('sign in error: email already in use');
    })
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'login'])
      console.log('signed out');
    }).catch((error) => {
      console.warn(error);
      this.openSnackbar('Errore nell\'effettuare la disconessione ');
    })
  }


  /* MESSAGING */
  // Adds a text to Cloud Firestore.
  addMessage = async (feed: Feed): Promise<void | DocumentReference<DocumentData>> => {
    console.log(this.currentUser);
    let data: any;
    try {
      if (this.currentUser) {
        data = await addDoc(collection(this.firestore, 'greeninnovation'), {
          username: this.currentUser.email?.substring(0, this.currentUser.email.search("@")),
          email: this.currentUser.email,
          text: feed.text,
          timestamp: serverTimestamp(),
          uid: this.currentUser.uid
        });
        console.log(data);
        return data;
      } else {
        throw new Error('User is not logged in or note data is incomplete');
      }
    } catch (error) {
      console.warn('Error writing new message to Firebase Database', error);
      return;
      
    }
  }
}
