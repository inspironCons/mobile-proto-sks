import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TransaksiSksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-transaksi-sks',
  templateUrl: 'transaksi-sks.html',
})

export class TransaksiSksPage {
  data:any={"idUser":"","type":"SKS","sks":"","harga":"","total":"","telegramId":""};
  saldo:number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private api: ApiProvider,
              private storage: Storage,
              private toast: ToastController) {
    this.ambil_telegram();
    this.data.harga = 6000;
    this.data.total = 0;
    this.data
  }

  jumlah(event){
    this.data.total = event * this.data.harga
  }

  isReadonly(){
    return true;
  }
  ambil_telegram(){
    this.storage.get("DataUserInfo").then((data)=>{
      this.api.getData('/userdetail',data.id).subscribe((tele)=>{
        this.data.telegramId = tele.response.telegramId;
        this.saldo = tele.response.saldo;
      })
    })
  }

  auth(){
    if(this.data.total != 0){
      let alert = this.alertCtrl.create({
        title: 'Konfirmasi Pembayaran',
        message: 'Apakah Kamu Yakin Membayar SKS Seharga Rp '+ this.data.total ,
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
            handler: () => {
              this.data.total = 0;
            }
          },
          {
            text: 'Bayar',
            handler: () => {
              if(this.data.total <= this.saldo){
                this.storage.get("DataUserInfo").then((data)=>{
                  if(data){
                    this.data.idUser = data.id;
                    this.api.postData('/transaction',this.data)
                    .subscribe((data)=>{
                      let toast = this.toast.create({
                        message: data.message ,
                        duration: 3000,
                        position: 'top'
                      })
                      toast.present();
                      this.navCtrl.push("AuthPage",{
                        data: this.data,
                        expired: data.expired
                      });
                    },(err)=>{
                      let toast = this.toast.create({
                        message: err.error.message ,
                        duration: 3000,
                        position: 'top'
                      })
                      toast.present();
                    })
                  }
                })
              }else{
                let alert = this.alertCtrl.create({
                  title: 'Opppssss',
                  subTitle: 'Saldo tidak mencukupi',
                  buttons: ['Dismiss']
                });
                alert.present();
                this.data.total = 0;
              }
            }
          }
        ]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Opppssss',
        subTitle: 'Setidaknya pilih 1 SKS',
        buttons: ['Dismiss']
      });
      alert.present();
    } 
  }

}
