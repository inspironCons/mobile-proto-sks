import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransaksiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaksi',
  templateUrl: 'transaksi.html',
})
export class TransaksiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onTransaksi(transaksi:string){
    if(transaksi == 'SKS'){
      this.navCtrl.push('TransaksiSksPage');
    }
  }

  

}
