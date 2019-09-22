import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';

/**
 * Generated class for the SettingPasswordLanjutanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-password-lanjutan',
  templateUrl: 'setting-password-lanjutan.html',
})
export class SettingPasswordLanjutanPage {
  data:any;
  send:any={"username":"","id":"","password":"","confirmpass":"","telegramId":""}
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api : ApiProvider,
              private alertCtrl: AlertController,
              private toast : ToastController) 
  {
    this.data = navParams.get("data");
    this.send.username  = this.data.username;
    this.send.id        = this.data.id;
    this.send.telegramId= this.data.telegramId;
  }

  ubahPass(){
    if(this.send.password == this.send.confirmpass){
      // this.navCtrl.setRoot('navmenu/akunPage')
      this.api.updateData('/newPassword',this.send).subscribe((data)=>{
        let toast = this.toast.create({
          message: data.message ,
          duration: 3000,
          position: 'top'
        })
        toast.present();
        this.navCtrl.setRoot('NavmenuPage');
      },(err)=>{
        let toast = this.toast.create({
          message: err.error.message ,
          duration: 3000,
          position: 'top'
        })
        toast.present();
      })
    }else{
      const alert = this.alertCtrl.create({
        title: 'Opppsssss',
        subTitle: 'Password tidak sama',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

}
