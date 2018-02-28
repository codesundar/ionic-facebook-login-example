import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  isUserLoggedIn: any = false;
  userInfo: any = {};

  constructor(public navCtrl: NavController, public fb: Facebook) {

  }

  loginWithFB(){
    this.fb.login(["public_profile","email"]).then( loginRes => {

      this.fb.api('me/?fields=id,email,first_name,picture',["public_profile","email"]).then( apiRes => {
        
        this.userInfo = apiRes;
        this.isUserLoggedIn = true;

      }).catch( apiErr => console.log(apiErr));

    }).catch( loginErr => console.log(loginErr) )
  }

  logout(){
    this.fb.logout().then( logoutRes => 
      this.isUserLoggedIn = false
    ).catch(logoutErr => 
      console.log(logoutErr)
    );
  }

}
