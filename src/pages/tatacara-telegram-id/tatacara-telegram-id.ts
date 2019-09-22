import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// import { Market } from '@ionic-native/market/ngx';

/**
 * Generated class for the TatacaraTelegramIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tatacara-telegram-id',
  templateUrl: 'tatacara-telegram-id.html',
})
export class TatacaraTelegramIdPage {
  items = [
    {
      title: 'Install Telegram di market place mu',
      content: 'Install TELEGRAM di Play Store mu,atau klik tautan dibawah ini',
      icon: '1',
      time: {}
    },
    {
      title: 'Follow Akun BOT',
      content: 'ikuti Akun BOT dengan mencari di kolom pencarian yakni MELLANIAL WALLET dan GET ID',
      icon: '2',
      time: {}
    },
    {
      title: 'ketikan perintah',
      content: 'Ketikan perintah di akun BOT GET ID dengan mengetik "/start" atau "/my_id"',
      icon: '3',
      time: {}
    },
    {
      title: 'Salin Id Telegram',
      content: 'Setelah ada balasan, salin id Telegram mu ke registrasi page',
      icon: '4',
      time: {}
    }
  ]
  constructor(private viewCtrl:ViewController) {
  }


  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  

}
