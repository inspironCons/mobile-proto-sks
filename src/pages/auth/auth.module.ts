import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import {ionicPinCodeInputModule} from 'ionic3-pincode-input';

@NgModule({
  declarations: [
    AuthPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
    ionicPinCodeInputModule
  ],
})
export class AuthPageModule {}
