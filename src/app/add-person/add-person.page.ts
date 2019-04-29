import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-add-person',
	templateUrl: './add-person.page.html',
	styleUrls: ['./add-person.page.scss']
})
export class AddPersonPage implements OnInit {
	registrationFrom: FormGroup;
	showValid: boolean = false;

	constructor() {
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

	save() {}
}
