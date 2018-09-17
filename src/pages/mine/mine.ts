import { HttpProvider } from './../../providers/http/http';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { HandphonePage } from '../handphone/handphone';
import { OrganizationPage } from '../organization/organization';
import { SettingPage } from '../setting/setting';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  headPortrait : any;
  userName : any;
  emailaddress : any;
  organizationName : any;
  sysUserId : any;
  phonenumber : any;
  status : any;
  constructor(public navCtrl: NavController,
    public storage : Storage,
    private nativePageTransitions : NativePageTransitions,
    private httpProvider : HttpProvider) {

  }

  ionViewDidLoad() {
    
    this.storage.get('sysUserId').then((data) => { 
      if (data) {
        this.sysUserId = data;
      }
    });

    this.storage.get('headPortrait').then((data) => { 
      if (data) {
        this.headPortrait = this.httpProvider.API_URL + data;
      }
    });

    this.storage.get('userName').then((data) => { 
      if (data) {
        this.userName = data;
      }
    });

    this.storage.get('email').then((data) => { 
      if (data) {
        this.emailaddress = data;
      }
    });

    this.storage.get('organizationName').then((data) => { 
      if (data) {
        this.organizationName = data;
      }
    });

    this.storage.get('status').then((data) => { 
      if (data) {
        this.status = data;
      }
    });

    this.storage.get('phonenumber').then((data) => { 
      if (data) {
        this.phonenumber = data;
      }
    });
    
  }

  doChangeHandphone() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(HandphonePage);
  }

  doChangeOrganization() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(OrganizationPage);
  }

  doChangeSetting() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(SettingPage);
  }
  
}
