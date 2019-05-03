import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonDetailsModalPage } from './person-details-modal.page';

const routes: Routes = [
	{
		path: '',
		component: PersonDetailsModalPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [PersonDetailsModalPage]
})
export class PersonDetailsModalPageModule {}
