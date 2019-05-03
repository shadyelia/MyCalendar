import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(
			credentials.email,
			credentials.password
		);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	getUserId() {
		return this.user && this.user.uid;
	}

	signOut(): Promise<void> {
		localStorage.clear();
		return this.afAuth.auth.signOut();
	}
}
