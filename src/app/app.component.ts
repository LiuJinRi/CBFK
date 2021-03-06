import { Component } from '@angular/core';
import {App, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserProvider} from '../providers/user/user';
import { Storage} from '@ionic/storage';
import { ToastProvider} from "../providers/toast/toast";
import { CarProvider } from '../providers/car/car';
import { TabsPage } from '../pages/tabs/tabs';
import { ValueTransformer } from '../../node_modules/@angular/compiler/src/util';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage;
  backButtonPressed : boolean = false;

  constructor(private platform: Platform, 
    splashScreen: SplashScreen,
    public appCtrl: App,  
    public toastProvider: ToastProvider,
    userProvider: UserProvider) {
      platform.ready().then(() => {
        var lastTimeBackPress = 0;
        var timePeriodToExit  = 2000;

        splashScreen.hide();

        platform.registerBackButtonAction(() => {
          let activeNav: NavController = this.appCtrl.getActiveNavs()[0];

          if (activeNav.canGoBack()) {
              activeNav.pop();
          } else {
              if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                  this.platform.exitApp(); //Exit from app
              } else {
                  this.toastProvider.show("再按一次退出程序","warning")
                  lastTimeBackPress = new Date().getTime();
              }
          }
        });
        this.rootPage = LoginPage;
    });
  }
}
