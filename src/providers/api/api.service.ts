import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import {Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';

import { LoadingProvider } from '../loading/loading.service';

@Injectable()
export class ApiProvider {

  private baseUrl : string = "http://demo.ambivertum.com/Api/v1";

  constructor(private http: HttpClient,private loader:LoadingProvider ) {
    
  }

  postData(controller,data){
    let headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      // 'Content-Type':'application/json',
      'Accept':'application/json'
    })
    this.loader.show()
    return this.http.post(this.baseUrl+controller,JSON.stringify(data),{headers:headers})
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.cathcError)
    .finally(()=>{
      this.loader.hide()
    })
  }

  getData(controller,id) {
    this.loader.show()
    let httpParams = new HttpParams();
    return this.http.get(this.baseUrl+controller,{
      params : httpParams.set('id',id)
    })
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.cathcError)
    .finally(()=>{
      this.loader.hide()
    })
  }

  updateData(controller,data){
    let headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'application/json'
    })
    this.loader.show()
    return this.http.put(this.baseUrl+controller,JSON.stringify(data),{headers:headers})
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.cathcError)
    .finally(()=>{
      this.loader.hide()
    })
  }

  getLocalData(file){
    return this.http.get('../../assets/json/'+file)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.cathcError)
  }
  
  private logResponse(res:Response) {
    console.log(res)
  }

  private cathcError(error:Response){
    return Observable.throw(error)
  }

  private extractData(res : Response) {
    return res
  }

}
