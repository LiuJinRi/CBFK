
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { HandphonePage } from '../handphone/handphone';
import { OrganizationPage } from '../organization/organization';
import { SettingPage } from '../setting/setting';

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
    public storage : Storage) {

  }

  ionViewDidLoad() {
    
    this.storage.get('sysUserId').then((data) => { 
      //console.log(data);
      if (data) {
        this.sysUserId = data;
      }
    });

    this.storage.get('headPortrait').then((data) => { 
      //console.log(data);
      if (data) {
        this.headPortrait = "http://114.116.82.170:8200" + data;
      }
    });

    this.storage.get('userName').then((data) => { 
      //console.log(data);
      if (data) {
        this.userName = data;
      }
    });

    this.storage.get('email').then((data) => { 
      //console.log(data);
      if (data) {
        this.emailaddress = data;
      }
    });

    this.storage.get('organizationName').then((data) => { 
      //console.log(data);
      if (data) {
        this.organizationName = data;
      }
    });

    this.storage.get('status').then((data) => { 
      //console.log(data);
      if (data) {
        this.status = data;
      }
    });

    this.storage.get('phonenumber').then((data) => { 
      //console.log(data);
      if (data) {
        this.phonenumber = data;
      }
    });
    
    /*
    this.storage.get('user').then((data) => {
        console.log(data);
        if (data) {
          this.headPortrait =  "http://114.116.82.170:8200/" + data[0].headPortrait;
          this.userName = data[0].userName;
          this.emailaddress = data[0].email;
          this.organizationName = data[0].organizationName;
          this.status = data[0].status;
          this.sysUserId = data[0].sysUserId;
          this.phonenumber = data[0].phonenumber;
        }
    });
    */
  }

  doChangeHandphone() {
    this.navCtrl.push(HandphonePage);
  }

  doChangeOrganization() {
    this.navCtrl.push(OrganizationPage);
  }

  doChangeSetting() {
    this.navCtrl.push(SettingPage);
  }
  
}
