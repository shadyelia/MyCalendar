import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { PersonDetailsModalPage } from '../person-details-modal/person-details-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.page.html',
	styleUrls: ['./people-list.page.scss']
})
export class PeopleListPage implements OnInit {
	people = [];
	constructor(
		private db: AngularFireDatabase,
		private auth: AuthService,
		private navCtrl: NavController,
		public modalController: ModalController
	) {}

	ngOnInit() {
		this.db.database
			.ref(`/People/` + this.auth.getUserId())
			.once('value')
			.then(snapShot => {
				snapShot.forEach(s => {
					this.people.push(s.val());
				});
				console.log(this.people);
			});
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
		this.navCtrl.navigateRoot('add-person');
	}
}
