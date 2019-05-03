import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';

@Component({
	selector: 'app-person-details-modal',
	templateUrl: './person-details-modal.page.html',
	styleUrls: ['./person-details-modal.page.scss']
})
export class PersonDetailsModalPage implements OnInit {
	personObject: any;

	constructor(
		private navCtrl: NavController,
		private modalController: ModalController,
		private navParams: NavParams
	) {}

	ngOnInit() {
		//console.table(this.navParams);
		this.personObject = this.navParams.data.personObject;
	}

	async openAddEvent() {
		await this.modalController.dismiss();
		localStorage.setItem('personObject', JSON.stringify(this.personObject));
		this.navCtrl.navigateForward('add-event');
	}

	async closeModal() {
		//const onClosedData: string = 'Wrapped Up!';
		await this.modalController.dismiss();
	}
}
