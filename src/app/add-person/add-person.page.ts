import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Person } from '../models/person-view-model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
@Component({
	selector: 'app-add-person',
	templateUrl: './add-person.page.html',
	styleUrls: ['./add-person.page.scss']
})
export class AddPersonPage implements OnInit {
	registrationFrom: FormGroup;
	showValid: boolean = false;
	person = new Person();

	constructor(private db: AngularFireDatabase, private auth: AuthService) {
		this.registrationFrom = new FormGroup({
			name: new FormControl('', Validators.required),
			gender: new FormControl('', Validators.required),
			phone: new FormControl('', Validators.required),
			dateOfBirth: new FormControl('', Validators.required),
			email: new FormControl(
				'',
				Validators.compose([Validators.required, Validators.email])
			)
		});
	}

	ngOnInit() {}

	save() {
		if (this.registrationFrom.valid) {
			this.person.dateOfBirth = this.registrationFrom.get(
				'dateOfBirth'
			).value;
			this.person.email = this.registrationFrom.get('email').value;
			this.person.gender = this.registrationFrom.get('gender').value;
			this.person.name = this.registrationFrom.get('name').value;
			this.person.phone = this.registrationFrom.get('phone').value;

			this.db.list('/People/' + this.auth.getUserId()).push(this.person);
		}
	}
}
