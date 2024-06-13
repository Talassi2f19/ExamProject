import { Injectable, inject } from '@angular/core';
import { Auth, User, GoogleAuthProvider, user, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Utente } from '../model/user.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../login/dialog/dialog.component';

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
      this.openSnackbar('Account non esistente: registrazione effettuata con successo');
      this.openDialog(email, password);
      //this.signUpDefault(email, password);
    })
  }

  openDialog(email: string, password: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.signUpDefault(email, password);
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
  
}
