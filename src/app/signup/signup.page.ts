import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController, MenuController } from '@ionic/angular';
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
		private navCtrl: NavController,
		private auth: AuthService,
		public menu: MenuController,
		private alertCtrl: AlertController
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

	ionViewDidEnter() {
		this.menu.enable(false);
	}
	ionViewWillLeave() {
		this.menu.enable(true);
	}

	signUp() {
		let data = this.registrationFrom.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.navigateRoot('home'),
			async error => {
				const alert = await this.alertCtrl.create({
					header: 'خطأ',
					message: 'البريد الالكترونى متكرر',
					buttons: ['اغلاق']
				});
				alert.present();
			}
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
