
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class LoadingProvider {

  constructor(public http: HttpClient,private loader:LoadingController ) {
    
  }

  loading:any

  show() {
    if(!this.loading){
      this.loading = this.loader.create({
        spinner: 'bubbles'
      })
      this.loading.present();
    }
  }

  hide() {
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
