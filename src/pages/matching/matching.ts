import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MatchingDetailPage } from '../matching-detail/matching-detail';
import { CarProvider } from '../../providers/car/car';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the MatchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})
export class MatchingPage {
  
  //private  responsedata : ResponseData;
  public items: any = [];
  public perPage: number = 10;
  public searchText:string = null;
  public findForm: FormGroup;
  sysUserId : string = null;
  boxCode : string = null;
  organizationId : string = null;

  constructor(
    public navCtrl: NavController,
    public carProvider : CarProvider,
    private formBuilder: FormBuilder,
    public storage : Storage,
    public toastProvider : ToastProvider,
    public alertCtrl : AlertController,   
    private barcodeScanner: BarcodeScanner
  ) {
    this.findForm = this.formBuilder.group({
      'searchtext': ['', [Validators.required]]
    });

    storage.get('sysUserId').then((data) => { 
      console.log(data);
      if (data) {
        this.sysUserId = data;
      }
    });

    storage.get('organizationId').then((data) => { 
      console.log(data);
      if (data) {
        this.organizationId = data;
      }
    });
  }

  ionViewWillEnter() {
    this.findForm = this.formBuilder.group({
      'searchtext': ['', [Validators.required]]
    });

    this.getCarList(0);
  }

  getCarList(page) {
    console.log(this.organizationId);
    this.carProvider.carBindList(page, this.perPage, this.organizationId).then((data) => {
      console.log(data);
        var items_tmp = [];
        if (data) {
          if ( page == 0) {
            this.items = items_tmp;
          }
          if (this.items.length == 0) {
              this.items = data.rows;               
          } else {
              this.items = this.items.concat(data.rows);
          }
        }
    });
  }

  doRefresh(refresher) {

    this.getCarList(0);

    setTimeout(() => {
        refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {

    var num = this.items.length;

    if (num > 0 && num % this.perPage == 0) {
        var page = num + 1;
        this.getCarList(page);
    } 

    setTimeout(() => {
        infiniteScroll.complete();
    }, 2000);
  }

  doFind() {
    var val = this.findForm.value['searchtext'];
    console.log(val);
    if (val && val.trim() != '') { 
      this.carProvider.findCarMsg(val, 1, this.sysUserId, this.organizationId).then((data)=>{
        console.log(data);
        this.items = data.rows;   
      }).catch((err)=>{
        return;
      });
    } 
  }

  scan(item) {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.boxCode = barcodeData.text;
      this.carProvider.carBindScan(this.boxCode, item.vincode, this.sysUserId, this.organizationId).then((data)=>{
        console.log(data)
        if (data['msg']== "成功") {
          this.toastProvider.show("车辆绑定成功",'success');
          this.navCtrl.push(MatchingPage);
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
    }

  unmatching( item ) {
    
    var vincode = item.vincode;
    var deviceBoxId = item.deviceBoxId;

    console.log(vincode);
    console.log(deviceBoxId);

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
                this.carProvider.carUnBind(vincode, deviceBoxId, this.sysUserId, this.organizationId).then((data)=>{
                  console.log(data);
                  if (data['msg'] == "成功") {
                    this.toastProvider.show("车辆解绑成功",'success');
                    this.navCtrl.push(MatchingPage);
                  } else {
                    this.toastProvider.show(data['msg'],'errors');
                    return;
                  }
                  this.items.clear();
                  this.getCarList(0);
                }).catch((err)=>{
                  return;
                });
              }
          }
      ]
    });
    confirm.present();
  }

  detail( item ) {
    console.log(item); 
    var carId = item.carId;
    var carType = item.carType;
    this.navCtrl.push(MatchingDetailPage, { 'carId' : carId, 'carType' : carType });
  }

}
