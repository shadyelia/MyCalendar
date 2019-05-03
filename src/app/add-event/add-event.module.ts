import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddEventPage } from './add-event.page';

const routes: Routes = [
	{
		path: '',
		component: AddEventPage
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
	declarations: [AddEventPage]
})
export class AddEventPageModule {}
