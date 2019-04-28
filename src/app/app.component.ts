import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	pages: Array<{ title: string; component: string; icon: string }>;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		this.initializeApp();
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
		console.log(page);
	}
}
