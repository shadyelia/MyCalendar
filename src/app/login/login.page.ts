import { Component } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from '@angular/forms';
import {
	NavController,
	AlertController,
	MenuController,
	LoadingController
} from '@ionic/angular';
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
	loaderToShow: any;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder,
		private alertCtrl: AlertController,
		public menu: MenuController,
		public loadingController: LoadingController
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

	ionViewDidEnter() {
		this.menu.enable(false);
	}
	ionViewWillLeave() {
		this.menu.enable(true);
	}

	login() {
		if (this.loginForm.valid) {
			this.showLoader();
			let data = this.loginForm.value;

			if (!data.email) {
				return;
			}

			let credentials = {
				email: data.email,
				password: data.password
			};
			this.auth.signInWithEmail(credentials).then(
				() => {
					this.hideLoader();
					this.navCtrl.navigateRoot('home');
				},
				async error => {
					const alert = await this.alertCtrl.create({
						header: 'خطأ',
						message: 'كلمة المرور او البريد الالكترونى غير صحيح',
						buttons: ['اغلاق']
					});
					this.hideLoader();
					alert.present();
				}
			);
		}
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

	signUp() {
		this.navCtrl.navigateForward('signup');
	}
}
