import { Component } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;
	showValid: boolean = false;
	showPassword: boolean;
	passwordType: string;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder
	) {
		this.loginForm = new FormGroup({
			email: new FormControl(
				'',
				Validators.compose([Validators.required, Validators.email])
			),
			password: new FormControl(
				'',
				Validators.compose([Validators.required])
			)
		});
		this.passwordType = 'password';
	}

	login() {
		if (this.loginForm.valid) {
			let data = this.loginForm.value;

			if (!data.email) {
				return;
			}

			let credentials = {
				email: data.email,
				password: data.password
			};
			this.auth
				.signInWithEmail(credentials)
				.then(
					() => this.navCtrl.navigateRoot('home'),
					error => (this.loginError = error.message)
				);
		} else {
			this.showValid = true;
		}
	}

	handelShowPassword() {
		this.showPassword = !this.showPassword;
		this.passwordType = this.showPassword ? 'text' : 'password';
	}

	signUp() {
		this.navCtrl.navigateForward('signup');
	}
}
