import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onMetode(pageMenu:string){
    if(pageMenu == 'voucher'){
      this.navCtrl.push('VouchermethodPage');
    }
  }

}