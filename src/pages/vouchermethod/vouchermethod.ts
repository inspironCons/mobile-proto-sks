import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the VouchermethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vouchermethod',
  templateUrl: 'vouchermethod.html',
})
export class VouchermethodPage {
  data:any = {"voucher":"","id":""};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api : ApiProvider,
              private toast: ToastController,
              private storagae:Storage) {

  }

  Reedem(){
    this.storagae.get("DataUserInfo").then((data)=>{
      this.data.id = data.id;
    })
    this.api.postData('/redeem',this.data)
    .subscribe((data)=>{
      let toast = this.toast.create({
        message: data.message ,
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.popToRoot();
    },(err)=>{
      let toast = this.toast.create({
        message: err.error.message ,
        duration: 2000,
        position: 'top'
      })
      toast.present()
    })
  }

}
