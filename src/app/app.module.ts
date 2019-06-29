
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyApp } from './app.component';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { MatchingPage } from '../pages/matching/matching';
import { MatchingDetailPage } from '../pages/matching-detail/matching-detail';
import { MacthingmenuPage } from '../pages/macthingmenu/macthingmenu';

import { ParkPage } from '../pages/park/park';
import { ParkMenuPage } from '../pages/park-menu/park-menu';
import { ParkDetailPage } from '../pages/park-detail/park-detail';
import { ParkSimilarDetailPage } from '../pages/park-similar-detail/park-similar-detail';

import { LevelPage } from '../pages/level/level';
import { LevelmenuPage } from '../pages/levelmenu/levelmenu';
import { LevelDetailPage } from '../pages/level-detail/level-detail';
import { LevelInformationPage } from '../pages/level-information/level-information';
import { LevelLocatePage } from '../pages/level-locate/level-locate';

import { MinePage } from '../pages/mine/mine';
import { HandphonePage } from '../pages/handphone/handphone';
import { ChangehandphonePage } from '../pages/changehandphone/changehandphone';
import { OrganizationPage } from '../pages/organization/organization';
import { ApplyOrganizationPage } from '../pages/apply-organization/apply-organization';
import { SettingPage } from '../pages/setting/setting';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from  '@angular/common/http';

import { HttpProvider } from '../providers/http/http';
import { UserProvider } from '../providers/user/user';
import { ToastProvider } from '../providers/toast/toast';
import { CarProvider } from '../providers/car/car';
import { StorageService } from '../providers/storage/storageservice';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    MatchingPage,
    MatchingDetailPage,
    MacthingmenuPage,
    LevelPage,
    LevelmenuPage,
    LevelDetailPage,
    LevelInformationPage,
    LevelLocatePage,
    ParkPage,
    ParkMenuPage,
    ParkDetailPage,
    ParkSimilarDetailPage,
    MinePage,
    HandphonePage,
    ChangehandphonePage,
    OrganizationPage,
    ApplyOrganizationPage,
    SettingPage,
    ChangepasswordPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'cbfk_db',
      driverOrder: ['sqlite', 'websql', 'indexdb', 'localstorage']
    }),
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    MatchingPage,
    MatchingDetailPage,
    MacthingmenuPage,
    LevelPage,
    LevelmenuPage,
    LevelDetailPage,
    LevelInformationPage,
    LevelLocatePage,
    ParkPage,
    ParkMenuPage,
    ParkDetailPage,
    ParkSimilarDetailPage,
    MinePage,
    ChangehandphonePage,
    HandphonePage,
    OrganizationPage,
    ApplyOrganizationPage,
    SettingPage,
    ChangepasswordPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    UserProvider,
    ToastProvider,
    CarProvider,
    StorageService,
    Geolocation,
    BarcodeScanner,
    
  ]
})
export class AppModule {}
