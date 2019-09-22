import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import {PopoverUbahComponent} from '../../components/popover-ubah/popover-ubah';
import {ApiProvider} from '../../providers/api/api.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailAkunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-akun',
  templateUrl: 'detail-akun.html',
})
export class DetailAkunPage {
  public infoDetail:any;
  id:number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private popoverCtrl: PopoverController,
              private storage: Storage) {

    this.infoDetail = {};
    this.id = navParams.get('id');
    this.ambil_data();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverUbahComponent);
    popover.present({
      ev: myEvent
    });

  }
  
  ambil_data(){
    this.storage.get("DataUserInfo").then((info)=>{
      if(info){
        this.api.getData('/userdetail',info.id)
        .subscribe((data)=>{
          if(data){
            this.infoDetail = data.response;
          }
          if((data.response.alamat && data.response.kecamatan &&data.response.kota && data.response.provinsi && data.response.kodePos) === null){
            this.infoDetail.alamat = '';
            this.infoDetail.kecamatan = '';
            this.infoDetail.kota = '';
            this.infoDetail.provinsi = '';
            this.infoDetail.kodePos = '';
          }
        })
      }
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ambil_data();
      event.complete();
    }, 2000);
  }

}
