import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPasswordPage } from './setting-password';

@NgModule({
  declarations: [
    SettingPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPasswordPage),
  ],
})
export class SettingPasswordPageModule {}
