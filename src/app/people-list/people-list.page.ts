import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

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
		private navCtrl: NavController
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

	openPersonDetails(index: number) {}

	deletePerson(index: number) {}

	addPerson() {
		this.navCtrl.navigateRoot('add-person');
	}
}
