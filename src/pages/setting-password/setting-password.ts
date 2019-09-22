import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-password',
  templateUrl: 'setting-password.html',
})
export class SettingPasswordPage {
  data:any ={"id":"","password":"","telegramId":"","username":""};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api : ApiProvider,
              private storage: Storage,
              private toast: ToastController ) 
  {
    this.ambil_user();
  }

  ambil_user(){
    this.storage.get("DataUserInfo").then((data)=>{
      this.data.id = data.id;
      this.api.getData('/userDetail',data.id).subscribe((data)=>{
        this.data.telegramId = data.response.telegramId;
        this.data.username  = data.response.username;
      })
    })
  }


  cekPassword(){
    this.api.postData('/cekPass',this.data)
    .subscribe((data)=>{
      let toast = this.toast.create({
        message: data.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
      
      this.navCtrl.push('SettingPasswordLanjutanPage',{
        data: this.data
      });
    },(err)=>{
      let toast = this.toast.create({
        message: err.error.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
    })
  }
  
}
