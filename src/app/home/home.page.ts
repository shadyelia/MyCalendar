import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	collapseCard: boolean = false;
	loaderToShow: any;

	minDate = new Date().toISOString();

	eventSource = [];
	viewTitle;

	calendar = {
		mode: 'month',
		currentDate: new Date(),
		locale: 'ar-EG'
	};

	@ViewChild(CalendarComponent) myCal: CalendarComponent;

	constructor(
		private db: AngularFireDatabase,
		private auth: AuthService,
		private alertCtrl: AlertController,
		public loadingController: LoadingController,
		@Inject(LOCALE_ID) private locale: string
	) {}

	ionViewWillEnter() {
		this.showLoader();
		this.auth.afAuth.authState.subscribe(user => {
			if (user) {
				this.db.database
					.ref(`/Events/` + user['uid'])
					.once('value')
					.then(snapShot => {
						this.hideLoader();
						snapShot.forEach(s => {
							this.addEvent(s.val());
						});
						this.myCal.loadEvents();
					});
			}
			this.hideLoader();
		});
	}

	// Create the right event format and reload source
	addEvent(event: any) {
		let eventCopy = {
			title: event['title'],
			startTime: new Date(event['startTime']),
			endTime: new Date(event['endTime']),
			desc: event['desc']
		};

		this.eventSource.push(eventCopy);
	}

	// Change current month/week/day
	next() {
		var swiper = document.querySelector('.swiper-container')['swiper'];
		swiper.slideNext();
	}

	back() {
		var swiper = document.querySelector('.swiper-container')['swiper'];
		swiper.slidePrev();
	}

	// Change between month/week/day
	changeMode(mode) {
		this.calendar.mode = mode;
	}

	// Focus today
	today() {
		this.calendar.currentDate = new Date();
	}

	// Selected date reange and hence title changed
	onViewTitleChanged(title) {
		this.viewTitle = title;
	}

	// Calendar event was clicked
	async onEventSelected(event) {
		// Use Angular date pipe for conversion
		let start = formatDate(event.startTime, 'medium', this.locale);
		let end = formatDate(event.endTime, 'medium', this.locale);

		const alert = await this.alertCtrl.create({
			header: event.title,
			subHeader: event.desc,
			message: 'From: ' + start + '<br><br>To: ' + end,
			buttons: ['OK']
		});
		alert.present();
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
}
