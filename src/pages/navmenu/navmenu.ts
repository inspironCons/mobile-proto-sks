import { Component } from '@angular/core';
import { IonicPage, NavController ,App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the NavmenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navmenu',
  templateUrl: 'navmenu.html'
})
export class NavmenuPage {


  berandaRoot = 'BerandaPage'
  riwayatRoot = 'RiwayatPage'
  akunRoot = 'AkunPage'

  infoUser: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              private app: App ) { 

  }

  ionViewDidLoad(){
    this.storage.get("DataUserInfo")
    .then((data)=>{
      if(data !=null){
        console.log('telah login')
      }else{
        this.app.getRootNav().setRoot("LoginPage");
      }
    })
  }
  

}
