import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ApiProvider } from '../../providers/api/api.service';

@IonicPage()
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {
  userInfo:any;
  constructor(public storage:Storage,
              private navCtrl: NavController,
              private app : App,
              private auth: AuthServiceProvider,
              private api : ApiProvider ) {
    this.userInfo ={};
    this.ambil_data();
  }

  navigatePage(PageMenu : string,id:number=null) {
    if(PageMenu === 'LoginPage'){
      this.auth.logout();
      this.storage.remove("DataUserInfo")
      this.app.getRootNav().setRoot(PageMenu);
    }else{
      this.navCtrl.push('DetailAkunPage')
    }
  }

  ambil_data(){
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
}
