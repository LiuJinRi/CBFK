import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { MatchingPage } from '../matching/matching';
import {ToastProvider} from "./../../providers/toast/toast";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '../../../node_modules/@ionic/storage';

/**
 * Generated class for the MacthingmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-macthingmenu',
  templateUrl: 'macthingmenu.html',
})
export class MacthingmenuPage {
  boxCode: string = null;
  sysUserId: string = null;
  carId: string = null;
  vincode: string = null;
  deviceBoxId: string = null;
  organizationId : string = null;

  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    public toastProvider : ToastProvider,
    public alertCtrl : AlertController,
    private barcodeScanner: BarcodeScanner,
    private storage : Storage) {
      console.log(this.navParams);
        if (this.navParams.data) {
            this.boxCode = this.navParams.get('boxCode');
            this.sysUserId = this.navParams.get('sysUserId');
            this.carId = this.navParams.get('carId');
            this.vincode = this.navParams.get('vincode');
            this.deviceBoxId = this.navParams.get('deviceBoxId');
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

  unmatching() {
    //this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定要解绑？',
      buttons: [
          {
              text: '否',
              handler: () => {
              }
          },
          {
              text: '是',
              cssClass: 'my-alert-danger',
              handler: () => {
                this.carProvider.carUnBind(this.vincode, this.deviceBoxId, this.sysUserId, this.organizationId).then((data)=>{
                  if (data['msg'] == "成功") {
                    this.toastProvider.show("车辆解绑成功",'success');
                    this.navCtrl.push(MatchingPage);
                    this.viewCtrl.dismiss();
                  } else {
                    this.toastProvider.show(data['msg'],'errors');
                    return;
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

scan() {
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.boxCode = barcodeData.text;
    this.carProvider.carBindScan(this.boxCode, this.vincode, this.sysUserId, this.organizationId).then((data)=>{
      console.log(data)
      if (data['msg']== "成功") {
        this.toastProvider.show("车辆绑定成功",'success');
        this.navCtrl.push(MatchingPage);
        this.viewCtrl.dismiss();
      } else {
        this.toastProvider.show(data['msg'],'errors');
        return;
      }
    }).catch((err)=>{
      return;
    });
   }).catch(err => {
       console.log('Error', err);
   });
   //this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
