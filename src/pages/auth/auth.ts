import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  cache:any;
  expired:number;
  data:any = {"idUser":"","token":"","total":""}
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private toast: ToastController) {
    this.cache = {};
    this.cache = navParams.get("data");
    this.expired = navParams.get("expired");

    console.log(this.cache);
  }

  onPinCodeComplete(event){
    this.data.token = event;
    this.data.idUser = this.cache.idUser;
    this.data.total = this.cache.total;
    console.log(this.data)
    this.api.updateData('/authtransaction',this.data)
    .subscribe((data)=>{
      if(data){
        let toast = this.toast.create({
          message: data.message ,
          duration: 3000,
          position: 'top'
        })
        toast.present();
        this.navCtrl.popToRoot();
      }
    },(err)=>{
      let toast = this.toast.create({
        message: err.error.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present();
    })
  }
}
