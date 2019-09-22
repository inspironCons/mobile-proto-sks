
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private isLogged: boolean = false
  constructor() {
   
  }

  login() :void{
    this.isLogged = true;
  }

  logout():void {
    this.isLogged = false;
  }

  authentication(): boolean {
    return this.isLogged;
  }
}
