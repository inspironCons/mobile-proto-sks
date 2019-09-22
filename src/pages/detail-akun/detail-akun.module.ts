import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAkunPage } from './detail-akun';


@NgModule({
  declarations: [
    DetailAkunPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAkunPage)
  ],
})
export class DetailAkunPageModule {}
