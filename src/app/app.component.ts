import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	pages: Array<{ title: string; component: string; icon: string }>;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private navCtrl: NavController,
		private auth: AuthService
	) {
		this.initializeApp();

		this.auth.afAuth.authState.subscribe(
			user => {
				if (user) {
					this.navCtrl.navigateRoot('home');
				} else {
					this.navCtrl.navigateRoot('login');
				}
			},
			() => {
				this.navCtrl.navigateRoot('login');
			}
		);
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		this.pages = [
			{
				title: 'الصفحة الرئيسة',
				component: 'home',
				icon: 'home'
			},
			{
				title: 'قائمة الاشخاص',
				component: 'addperson',
				icon: 'people'
			},
			{
				title: 'اضافة شخص',
				component: 'addperson',
				icon: 'person-add'
			},
			{
				title: 'الخروج',
				component: 'addperson',
				icon: 'log-out'
			}
		];
	}

	openPage(page) {
		if (page.title === 'الخروج') {
			this.logout();
		} else if (page.title === 'اضافة شخص') {
			this.navCtrl.navigateRoot('add-person');
		} else if (page.title == 'قائمة الاشخاص') {
			this.navCtrl.navigateForward('people-list');
		}
	}

	logout() {
		this.auth.signOut();
		this.navCtrl.navigateRoot('login');
	}
}
