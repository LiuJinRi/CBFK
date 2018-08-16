import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import {ToastProvider} from "./../../providers/toast/toast";

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

  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    public toastProvider : ToastProvider) {
      console.log(this.navParams);
        if (this.navParams.data) {
            this.sysUserId = this.navParams.get('sysUserId');
            this.marketDoubtId = this.navParams.get('marketDoubtId');
        }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  pass(handleResult) {
    this.viewCtrl.dismiss();
    console.log(handleResult);
    console.log(this.marketDoubtId);
    console.log(this.sysUserId);
    this.carProvider.carParkPass(handleResult, this.marketDoubtId, this.sysUserId).then((data)=>{
      console.log(data)
      if (data['msg'] == "成功") {
        this.toastProvider.show("处理成功",'success');
        //this.navCtrl.push(ParkPage);
        this.viewCtrl.dismiss();
      } else {
        this.toastProvider.show(data['msg'],'errors');
        this.viewCtrl.dismiss();
      }
    }).catch((err)=>{
      return;
    });
    
  }

}
