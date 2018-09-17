import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';

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
    public platform : Platform,
    private nativePageTransitions : NativePageTransitions) {
  }

  ionViewDidLoad() {
  }

  //变更密码
  doChangePassword() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(ChangepasswordPage);
  }

  //退出
  logout() {
    this.storage.clear().then((data) => {
      this.app.getRootNavs()[0].setRoot(LoginPage); 
    });
  }
  //退出系统
  doExitSystem() {
    this.storage.clear().then((data) => {
      this.platform.exitApp();
    });
  }

}
