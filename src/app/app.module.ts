import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData } from '@angular/common';
import localeArEG from '@angular/common/locales/ar-EG';
import localeArEGExtra from '@angular/common/locales/extra/ar-EG';

registerLocaleData(localeArEG, localeArEGExtra);
@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
