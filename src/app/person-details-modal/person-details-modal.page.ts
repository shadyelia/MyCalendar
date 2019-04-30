import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-person-details-modal',
	templateUrl: './person-details-modal.page.html',
	styleUrls: ['./person-details-modal.page.scss']
})
export class PersonDetailsModalPage implements OnInit {
	personObject: any;

	constructor(
		private modalController: ModalController,
		private navParams: NavParams
	) {}

	ngOnInit() {
		console.table(this.navParams);
		this.personObject = this.navParams.data.personObject;
	}

	async closeModal() {
		//const onClosedData: string = 'Wrapped Up!';
		await this.modalController.dismiss();
	}
}
