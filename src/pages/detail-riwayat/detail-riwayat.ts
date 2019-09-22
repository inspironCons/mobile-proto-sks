import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';
import moment from 'moment';

/**
 * Generated class for the DetailRiwayatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-riwayat',
  templateUrl: 'detail-riwayat.html',
})
export class DetailRiwayatPage {
  params:number;
  data:any;
  
  indo_tanggal:any;
  indo_waktu:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api:ApiProvider ) 
  {
    this.data ={}
    this.params = navParams.get('id')
    this.get_detail();
    this.tanggal_indo();
    this.waktu_indo();
  }

  closeModal():void{
    this.navCtrl.pop();
  }

  get_detail(){
    this.api.getData('/detailtransaction',this.params)
    .subscribe((data)=>{
      this.data = data.response;
    })
  }
  
  tanggal_indo(){
    moment.locale('id')
    this.indo_tanggal = moment(this.data.transactionTime).format('dddd,D MMM YYYY')
  }
  waktu_indo() {
    this.indo_waktu = moment(this.data.transactionTime).format('HH:m:s')
  }

}
