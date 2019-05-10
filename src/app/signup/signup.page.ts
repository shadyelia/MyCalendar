import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
	NavController,
	AlertController,
	MenuController,
	LoadingController
} from '@ionic/angular';
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
	loaderToShow: any;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		public menu: MenuController,
		private alertCtrl: AlertController,
		public loadingController: LoadingController
	) {
		this.registrationFrom = new FormGroup({
			name: new FormControl('', Validators.required),
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
		this.showLoader();
		let data = this.registrationFrom.value;
		let credentials = {
			displayName: data.name,
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => {
				this.hideLoader();
				this.navCtrl.navigateRoot('home');
			},
			async error => {
				const alert = await this.alertCtrl.create({
					header: 'خطأ',
					message: 'البريد الالكترونى متكرر',
					buttons: ['اغلاق']
				});
				this.hideLoader();
				alert.present();
			}
		);
	}

	showLoader() {
		this.loaderToShow = this.loadingController
			.create({
				message: 'الرجاء الانتظار'
			})
			.then(res => {
				res.present();

				res.onDidDismiss().then(dis => {});
			});
	}

	hideLoader() {
		this.loadingController.dismiss();
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
