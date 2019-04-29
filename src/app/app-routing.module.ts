import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
	{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'add-person', loadChildren: './add-person/add-person.module#AddPersonPageModule' },  { path: 'people-list', loadChildren: './people-list/people-list.module#PeopleListPageModule' }

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
