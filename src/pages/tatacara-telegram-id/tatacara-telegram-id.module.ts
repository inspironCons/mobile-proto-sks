import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TatacaraTelegramIdPage } from './tatacara-telegram-id';
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from '../../components/timeline/timeline';

@NgModule({
  declarations: [
    TatacaraTelegramIdPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
  ],
  imports: [
    IonicPageModule.forChild(TatacaraTelegramIdPage),
  ],
})
export class TatacaraTelegramIdPageModule {}
