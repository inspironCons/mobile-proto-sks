import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  //validate
  isCorrectUsername:boolean;
  isCorrectNIM:boolean;
  text:any =  {"username":"","nim":""};
  color:any=  {"username":"","nim":""};
  //inisiasi pilihan
  FAKULTAS:any[]
  JURUSAN:any[]

  //inisiasi select
  selectJurusan: any[]
  
  //serialize data
  data:any = {"username":"","email":"","telegramId":"","namaDepan":"","namaBelakang":"","NIM":"","fakultas":"","jurusan":""}

  constructor(private navCtrl: NavController,
              private toast: ToastController,
              private api: ApiProvider,
              private modalCtrl:ModalController,) {
    this.pilihFakultas()
    this.pilihJurusan()
  }

  SignUp() {
    this.api.postData('/registrasi',this.data)
    .subscribe(data =>{
      let toast = this.toast.create({
        message: data.message ,
        duration: 3000,
        position: 'top'
      })
      toast.present()
      if(data.status === 'success') {
        this.navCtrl.pop()
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

  ionViewWillLeave() {
    
  }

  setJurusan(Fakultas){
    this.selectJurusan = this.JURUSAN.filter(data => data.idFak == Fakultas.id)
    console.log(Fakultas.id)
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

  howTO(){
    let profileModal = this.modalCtrl.create('TatacaraTelegramIdPage');
    profileModal.present();
  }

  chekUsername(event){
    this.api.postData('/checkUsername',{"username": event})
    .subscribe((data)=>{
      this.isCorrectUsername = true;
      this.text.username = data.message
      this.color.username = 'secondary';
    },(err)=>{
      this.isCorrectUsername = false;
      this.text.username = err.error.message
      this.color.username = 'danger';
    })
  }

  chekNIM(event){
    this.api.postData('/checkNIM',{"NIM": event})
    .subscribe((data)=>{
      this.isCorrectNIM = true;
      this.text.nim = data.message
      this.color.nim = 'secondary';
    },(err)=>{
      this.isCorrectNIM = false;
      this.text.nim = err.error.message
      this.color.nim = 'danger';
    })
  }
}
