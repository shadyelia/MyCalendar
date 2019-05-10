import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import {
	NavController,
	MenuController,
	ModalController,
	LoadingController
} from '@ionic/angular';
import { PersonDetailsModalPage } from '../person-details-modal/person-details-modal.page';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.page.html',
	styleUrls: ['./people-list.page.scss']
})
export class PeopleListPage implements OnInit {
	people = [];
	loaderToShow: any;

	constructor(
		private db: AngularFireDatabase,
		private auth: AuthService,
		private navCtrl: NavController,
		public modalController: ModalController,
		public menu: MenuController,
		public loadingController: LoadingController
	) {}

	ngOnInit() {
		this.showLoader();
		this.db.database
			.ref(`/People/` + this.auth.getUserId())
			.once('value')
			.then(snapShot => {
				snapShot.forEach(s => {
					this.people.push({ key: s.key, value: s.val() });
				});
				this.hideLoader();
			});
	}

	ionViewDidEnter() {
		this.menu.close();
		this.menu.enable(false);
	}
	ionViewWillLeave() {
		this.menu.enable(true);
	}

	async openPersonDetails(index: number) {
		const modal = await this.modalController.create({
			component: PersonDetailsModalPage,
			componentProps: {
				personObject: this.people[index]
			}
		});

		modal.onDidDismiss().then(dataReturned => {});

		return await modal.present();
	}

	deletePerson(index: number) {}

	addPerson() {
		this.navCtrl.navigateForward('add-person');
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
