import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule ,LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import localeId from '@angular/common/locales/id';

import { MyApp } from './app.component';
import { ApiProvider } from '../providers/api/api.service';
import { LoadingProvider } from '../providers/loading/loading.service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import {PopoverUbahComponent} from '../components/popover-ubah/popover-ubah';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeId);

@NgModule({
  declarations: [
    MyApp,
    PopoverUbahComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverUbahComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "id" },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    LoadingProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
