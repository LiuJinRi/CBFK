import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : Storage,
    public app: App,
    public platform : Platform) {
  }

  ionViewDidLoad() {
  }

  doChangePassword() {
    this.navCtrl.push(ChangepasswordPage);
  }

  logout() {
    this.storage.clear().then((data) => {
      this.app.getRootNavs()[0].setRoot(LoginPage); 
    });
  }

  doExitSystem() {
    this.storage.clear().then((data) => {
      this.platform.exitApp();
    });
  }

}
