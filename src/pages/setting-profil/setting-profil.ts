import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SettingProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-profil',
  templateUrl: 'setting-profil.html',
})
export class SettingProfilPage {

  provinsi:any[];
  daerah:any[];
  kecamatan:any[];
  FAKULTAS:any[];
  JURUSAN:any[];

  selectKecamatan:any[];
  selectjurusan:any[];
  selectDaerah:any[];

  data:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api : ApiProvider,
              private storage: Storage,
              private toast : ToastController) {
    
    this.data = {};
    this.ambil_data();
    this.pilihFakultas();
    this.pilihJurusan();
    this.ambil_provinsi();
    this.ambil_daerah();
    this.ambil_kecamatan();
  }

  ambil_data(){
    this.storage.get("DataUserInfo").then((data)=>{
      if(data){
        this.api.getData('/userdetail',data.id).subscribe(info=>{
          this.data = info.response;
        });
      };
    });
  }

  save() {
    var kota = this.data.kota.regency;
    var prov = this.data.provinsi.province;
    var fak  = this.data.fakultas.fakultas;
    if(kota && prov != 'undifined'){
      this.data.provinsi = prov;
      this.data.kota = kota;
    }else if(this.data.fakultas == 'undifined'){
      this.data.fakultas = fak;
    }else if(fak){
      this.data.fakultas = fak;
    }
    // console.log(this.data)
    this.storage.get("DataUserInfo").then((info)=>{
    this.api.updateData('/userDetail',this.data)
    .subscribe((data)=>{
      let toast = this.toast.create({
        message: data.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
      if(data.status =='success'){
        this.navCtrl.pop();
      }
    },(error)=>{
      let toast = this.toast.create({
        message: error.error.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
    })
    })
  }

  ambil_provinsi(){
    this.api.getLocalData('province.json')
    .subscribe((data)=>{
      this.provinsi = data;
    })
  }

  ambil_daerah(){
    this.api.getLocalData('daerah.json')
    .subscribe((data)=>{
      this.daerah = data
    })
  }

  ambil_kecamatan(){
    this.api.getLocalData('kecamatan.json')
    .subscribe((data)=>{
      this.kecamatan = data
    })
  }

  pilihFakultas(){
    this.FAKULTAS = [
      {id:"1",fakultas: "Sains dan Teknologi"},
      {id:"2",fakultas: "Ekonomi"},
      {id:"3",fakultas: "Ilmu Administrasi dan Humaniora"},
      {id:"4",fakultas: "Keguruan dan Ilmu Pendidikan"},
      {id:"5",fakultas: "Pertanian"},
      {id:"6",fakultas: "Hukum"},
      {id:"7",fakultas: "Keperawatan"}
    ]
  }

  pilihJurusan() {
    this.JURUSAN = [
      {idFak:"1",Jurusan:"kimia"},
      {idFak:"1",Jurusan:"Teknik Sipil"},
      {idFak:"1",Jurusan:"Teknik Informatika"},
      {idFak:"2",Jurusan:"Akutansi"},
      {idFak:"2",Jurusan:"Perpajakan"},
      {idFak:"3",Jurusan:"Administrasi Bisnis"},
      {idFak:"3",Jurusan:"Administrasi Publik"},
      {idFak:"3",Jurusan:"Hubungan Masayarakat"},
      {idFak:"3",Jurusan:"Sastra Inggris"},
      {idFak:"4",Jurusan:"Pendidikan Guru Sekolah Dasar"},
      {idFak:"4",Jurusan:"Pendidikan Guru PAUD"},
      {idFak:"4",Jurusan:"Pendidikan Jasmani Kesehatan dan Rekreasi"},
      {idFak:"4",Jurusan:"Pendidikan Bahasa dan Sastra Indonesia"},
      {idFak:"4",Jurusan:"Pendidikan Matematika"},
      {idFak:"4",Jurusan:"Pendidikan Biologi"},
      {idFak:"4",Jurusan:"Pendidikan Teknologi Informasi"},
      {idFak:"5",Jurusan:"Agribisnis"},
      {idFak:"5",Jurusan:"Akuakultur"},
      {idFak:"6",Jurusan:"Ilmu Hukum" },
      {idFak:"7",Jurusan:"Keperawatan"},
    ]
  }

  setDaerah(Provinsi){
    this.selectDaerah = this.daerah.filter(data => data.province_id == Provinsi.id);
  }

  setKecamatan(daerah){
    this.selectKecamatan = this.kecamatan.filter(data=> data.daerah_id == daerah.id);
  }

  setJurusan(Fakultas){
    this.selectjurusan  = this.JURUSAN.filter(data=> data.idFak == Fakultas.id);
  }
}
