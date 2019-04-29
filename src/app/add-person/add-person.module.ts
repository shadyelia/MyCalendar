import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddPersonPage } from './add-person.page';

const routes: Routes = [
	{
		path: '',
		component: AddPersonPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [AddPersonPage]
})
export class AddPersonPageModule {}
