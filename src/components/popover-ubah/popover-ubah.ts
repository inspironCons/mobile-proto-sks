import { Component } from '@angular/core';
import { ViewController, ModalController, NavController } from 'ionic-angular';

/**
 * Generated class for the PopoverUbahComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-ubah',
  templateUrl: 'popover-ubah.html'
})
export class PopoverUbahComponent {
  constructor(public viewCtrl: ViewController,
              private modalCtrl:ModalController,
              private navCtrl: NavController) {
  }

  navigatePage(page:string) {
    if(page == 'setProfil'){
      let profileModal = this.modalCtrl.create('SettingProfilPage');
      profileModal.onDidDismiss((data) => {
        
      });
      profileModal.present();
      this.viewCtrl.dismiss();
    }else if(page = 'setPass'){
      this.navCtrl.push('SettingPasswordPage');
      this.viewCtrl.dismiss();
    }
  }

}
