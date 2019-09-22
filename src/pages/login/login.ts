import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ToastController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api.service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  info:any
  loginData = {"username":"","password":""}
  constructor(private navCtrl: NavController,
              private toast:ToastController,
              private api : ApiProvider,
              public storage: Storage,
              private auth: AuthServiceProvider)
  {
    this.info={};
    console.log(this.auth.authentication());
    this.logged();
    // if(this.info !=null){
    //   this.navCtrl.setRoot('NavmenuPage'); 
    // }
  }

  logged():void{
    this.storage.get("DataUserInfo")
    .then((data)=>{
      if(data!=null){
        this.navCtrl.setRoot('NavmenuPage');
      }
    })
  }

  login() {
    this.api.postData('/login',this.loginData)
    .subscribe(data =>{
      let toast = this.toast.create({
        message: data.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
      
      if(data.status === 'success') {
        this.storage.set("DataUserInfo",data.response).then((data)=>{
          this.info = data
        });
        this.auth.login();
        this.navCtrl.setRoot('NavmenuPage'); 
      }
    },(err)=>{
      let toast = this.toast.create({
        message: err.error.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
    })
    
  }
  navigatePage(PageMenu : string) {
    if(PageMenu === 'NavmenuPage'){
      this.login()
    }else{
      this.navCtrl.push(PageMenu);
    }
  }

}
