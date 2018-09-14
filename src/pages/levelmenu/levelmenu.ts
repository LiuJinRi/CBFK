
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController,App } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import {ToastProvider} from "./../../providers/toast/toast";
import { LevelInformationPage } from '../level-information/level-information';
import { LevelLocatePage } from '../level-locate/level-locate';
import { LevelPage } from '../level/level';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LevelmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-levelmenu',
  templateUrl: 'levelmenu.html',
})
export class LevelmenuPage {
  carId: string = null;
  dangerLevel: string = null;
  deviceBoxId: string = null;

  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    public app: App,
    public toastProvider : ToastProvider,
    public alertCtrl : AlertController) {
      //console.log(this.navParams);
        if (this.navParams.data) {
            this.carId = this.navParams.get('carId');
            this.dangerLevel = this.navParams.get('dangerLevel');
            this.deviceBoxId = this.navParams.get('deviceBoxId');
        }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  reactivate() {
    //
    console.log(this.deviceBoxId);
    this.viewCtrl.dismiss();
    this.carProvider.carReactivate(this.deviceBoxId).then((data)=>{
      console.log(data)
      if (data.msg == "成功") {
        this.toastProvider.show("车辆再激活成功",'success');
        this.navCtrl.push(TabsPage, {tabindex:"1"});
        this.viewCtrl.dismiss();
      } else {
        this.toastProvider.show("车辆再激活失败",'errors');
        this.navCtrl.push(TabsPage, {tabindex:"1"});
        this.viewCtrl.dismiss();
      }
    }).catch((err)=>{
      return;
    });
  }

  level() {
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: '设备等级',
      inputs: [
        {
          name: 'level',
          placeholder: '请输入等级',
          type: 'number'
        }
      ],
      buttons: [
          {
              text: '否',
              handler: data => {
              }
          },
          {
              text: '是',
              handler: data => {
                this.carProvider.carLevelChange(this.carId, data.level).then((data)=>{
                  if (data.msg == "成功") {
                    this.toastProvider.show("设置等级成功",'success');
                    this.navCtrl.push(TabsPage, {tabindex:"1"});
                    this.viewCtrl.dismiss();
                  } else {
                    this.toastProvider.show("设置等级失败",'errors');
                    this.navCtrl.push(TabsPage, {tabindex:"1"});
                    this.viewCtrl.dismiss();
                  }
                }).catch((err)=>{
                  return;
                });
              }
          }
      ]
    });
    confirm.present();
  }

  locate() {
    this.navCtrl.push(LevelLocatePage, {'deviceBoxId':this.deviceBoxId});
    this.viewCtrl.dismiss();
  }

  information() { 
    this.navCtrl.push(LevelInformationPage, {'deviceBoxId' : this.deviceBoxId});
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
