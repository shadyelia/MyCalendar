import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Event } from '../models/event-view-model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.page.html',
	styleUrls: ['./add-event.page.scss']
})
export class AddEventPage implements OnInit {
	minDate = new Date().toISOString();
	eventForm: FormGroup;
	showValid: boolean = false;
	event = new Event();

	constructor(
		private navCtrl: NavController,
		private db: AngularFireDatabase,
		private auth: AuthService
	) {
		this.eventForm = new FormGroup({
			personKey: new FormControl('', Validators.required),
			startTime: new FormControl('', Validators.required),
			endTime: new FormControl('', Validators.required),
			numberInMonth: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {}

	addEvent() {
		if (this.eventForm.valid) {
			this.event.PersonKey = this.eventForm.get('personKey').value;
			this.event.endTime = this.eventForm.get('endTime').value;
			this.event.numberInMonth = this.eventForm.get(
				'numberInMonth'
			).value;
			this.event.startTime = this.eventForm.get('startTime').value;

			this.db.list('/Events/' + this.auth.getUserId()).push(this.event);
			this.navCtrl.navigateForward('home');
		}
	}
}
