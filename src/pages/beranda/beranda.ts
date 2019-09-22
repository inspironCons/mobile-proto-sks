import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../providers/api/api.service';
/**
 * Generated class for the BerandaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment : 'Beranda'
})
@Component({
  selector: 'page-beranda',
  templateUrl: 'beranda.html',
})
export class BerandaPage {

  userInfo:any
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private api : ApiProvider) {
    this.userInfo = {}
    this.ambil_dataUser()
  }

  ionViewDidEnter() {
    this.ambil_dataUser();
  }

  ambil_dataUser() {
    this.storage.get("DataUserInfo")
    .then((data)=>{
      if(data){
        this.api.getData('/userdetail', data.id)
        .subscribe((element)=>{
          this.userInfo = element.response
        })
      }
     
    })
  }

  navigation(pageMenu:string){
    if(pageMenu === 'TransaksiPage'){
      this.navCtrl.push(pageMenu);
    }else if(pageMenu == 'TopupPage'){
      this.navCtrl.push(pageMenu);
    }
  }

  doRefresh(event){
    setTimeout(() => {
      this.ambil_dataUser();
      event.complete();
    }, 2000);
  }

}
