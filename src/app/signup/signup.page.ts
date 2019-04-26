import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage {
	showValid: boolean = false;
	signupError: string;
	registrationFrom: FormGroup;
	showPassword: boolean;
	passwordType: string;
	showConfirmPassword: boolean;
	confirmPasswordType: string;

	constructor(
		fb: FormBuilder,
		private navCtrl: NavController,
		private auth: AuthService
	) {
		this.registrationFrom = new FormGroup({
			email: new FormControl(
				'',
				Validators.compose([Validators.required, Validators.email])
			),
			password: new FormControl(
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(8),
					// this.equalto('confirmPassword'),
					Validators.pattern(
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$-/:-?{-~!"^_`\[\]@%$*])(?=.{8,})/
					)
				])
			),
			confirmPassword: new FormControl(
				'',
				Validators.compose([
					Validators.required,
					// this.equalto('password'),
					Validators.minLength(8),
					Validators.pattern(
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$-/:-?{-~!"^_`\[\]@%$*])(?=.{8,})/
					)
				])
			)
		});
		this.passwordType = 'password';
		this.confirmPasswordType = 'password';
	}

	signUp() {
		let data = this.registrationFrom.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth
			.signUp(credentials)
			.then(
				() => this.navCtrl.navigateRoot('home'),
				error => (this.signupError = error.message)
			);
	}

	handelShowPassword() {
		this.showPassword = !this.showPassword;
		this.passwordType = this.showPassword ? 'text' : 'password';
	}
	handelConfirmShowPassword() {
		this.showConfirmPassword = !this.showConfirmPassword;
		this.confirmPasswordType = this.showConfirmPassword
			? 'text'
			: 'password';
	}
}
