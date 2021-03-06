import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import {ToastProvider} from "./../../providers/toast/toast";
import { Storage } from '../../../node_modules/@ionic/storage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ParkMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-menu',
  templateUrl: 'park-menu.html',
})
export class ParkMenuPage {
  handleResult: string = null;
  sysUserId: string = null;
  marketDoubtId: string = null;
  organizationId : string = null;

  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    public storage : Storage,
    public toastProvider : ToastProvider) {
      console.log(this.navParams);
        if (this.navParams.data) {
            this.sysUserId = this.navParams.get('sysUserId');
            this.marketDoubtId = this.navParams.get('marketDoubtId');
        }

        storage.get('organizationId').then((data) => { 
          console.log(data);
          if (data) {
            this.organizationId = data;
          }
        });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  pass(handleResult) {
    console.log(handleResult);
    console.log(this.marketDoubtId);
    console.log(this.sysUserId);
    this.carProvider.carParkPass(handleResult, this.marketDoubtId, this.sysUserId, this.organizationId).then((data)=>{
      console.log(data)
      if (data['msg'] == "成功") {
        this.toastProvider.show("处理成功",'success');
        this.navCtrl.push(TabsPage, {tabindex:"2"});
        this.viewCtrl.dismiss();
      } else {
        this.toastProvider.show(data['msg'],'errors');
        this.navCtrl.push(TabsPage, {tabindex:"2"});
        this.viewCtrl.dismiss();
      }
    }).catch((err)=>{
      return;
    });
    
  }

}
