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
	personObject: any;
	collapseCard: boolean = false;

	constructor(
		private navCtrl: NavController,
		private db: AngularFireDatabase,
		private auth: AuthService
	) {}

	ngOnInit() {
		this.personObject = JSON.parse(localStorage.getItem('personObject'));
		this.eventForm = new FormGroup({
			personKey: new FormControl(
				{ value: this.personObject.key, disabled: true },
				Validators.required
			),
			day: new FormControl('', Validators.required),
			startTime: new FormControl('', Validators.required),
			endTime: new FormControl('', Validators.required),
			numberInMonth: new FormControl('', Validators.required)
		});
	}

	addEvent() {
		if (this.eventForm.valid) {
			this.getFourDaysOfTheMonth(
				this.eventForm.get('numberInMonth').value
			);
		}
	}

	getFourDaysOfTheMonth(type: number) {
		var numberOfDays = 0;
		var year = new Date().getFullYear();
		var month = new Date().getMonth();
		var counter = 0;
		var today = new Date().getDate();

		while (counter < 6) {
			for (var i = today; i <= new Date(year, month, 0).getDate(); i++) {
				var date = new Date(year, month, i);
				if (date.getDay() == this.eventForm.get('day').value) {
					if (type == 1) {
						this.formatEvet(date);
						break;
					} else if (type == 2) {
						if (numberOfDays == 0) {
							this.formatEvet(date);
						} else if (numberOfDays == 2) {
							this.formatEvet(date);
							break;
						}
						numberOfDays++;
					} else if (type == 4) {
						this.formatEvet(date);
					}
				}
			}
			numberOfDays = 0;
			month++;
			counter++;
			today = 1;
		}
		this.navCtrl.navigateRoot('home');
	}

	formatEvet(date: Date) {
		let event = new Event();
		event.title = this.personObject.value.name;
		event.desc = this.personObject.value.phone;
		event.PersonKey = this.eventForm.get('personKey').value;
		event.startTime = this.convertTimeToTheNewDate(
			date,
			'startTime'
		).toISOString();
		event.endTime = this.convertTimeToTheNewDate(
			date,
			'endTime'
		).toISOString();
		this.addEventToDB(event);
	}

	convertTimeToTheNewDate(date: Date, type: string) {
		var d = new Date();
		if (type == 'startTime') {
			d = new Date(this.eventForm.get('startTime').value);
		} else {
			d = new Date(this.eventForm.get('endTime').value);
		}

		let dateTime = date;
		dateTime.setHours(d.getHours());
		dateTime.setMinutes(d.getMinutes());
		return dateTime;
	}

	addEventToDB(event: Event) {
		this.db.list('/Events/' + this.auth.getUserId()).push(event);
	}
}
