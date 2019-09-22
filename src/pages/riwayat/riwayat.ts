import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api.service';

/**
 * Generated class for the RiwayatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-riwayat',
  templateUrl: 'riwayat.html',
})
export class RiwayatPage {
  historiTransaksi:any
  constructor(public navCtrl  : NavController,
              public navParams: NavParams,
              public storage  : Storage,
              private modalCtrl:ModalController,
              private api     : ApiProvider)
  {
    this.ambil_history()
  }

  ambil_history() {
    this.storage.get("DataUserInfo")
    .then((data)=>{
      this.api.getData('/historitransaction', data.id)
      .subscribe((element)=>{
        this.historiTransaksi = element.response
      },(err)=>{
        this.historiTransaksi = err.error.response
      })
    })
  }

  detailPage(id){
    let profileModal = this.modalCtrl.create('DetailRiwayatPage',{id: id});
    profileModal.present();
  }

  doRefresh(event){
    setTimeout(() => {
      this.ambil_history();
      event.complete();
    }, 2000);
  }
}
