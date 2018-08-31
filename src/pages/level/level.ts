import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LevelDetailPage } from '../level-detail/level-detail';
import { LevelInformationPage } from '../level-information/level-information';
import { LevelLocatePage } from '../level-locate/level-locate';
import { CarProvider } from '../../providers/car/car';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
/**
 * Generated class for the LevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
})
export class LevelPage {
  public items: any = [];
  public perPage: number = 10;
  public searchText:string = null;
  public findForm: FormGroup;
  public sysUserId : string = null;
  organizationId : string = null;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carProvider : CarProvider,
    private formBuilder: FormBuilder,
    public storage : Storage,
    public toastProvider : ToastProvider,
    public alertCtrl : AlertController) {
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
    this.carProvider.carLevelList(page, this.perPage, this.organizationId).then((data) => {
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
    if (val && val.trim() != '') { 
      this.carProvider.findCarMsg(val, 2, this.sysUserId, this.organizationId).then((data)=>{
        this.items = data.rows;
      }).catch((err)=>{
        return;
      });
    }
  }

  detail( item ) {
    console.log(item);
    var carId = item.carId;
    var carType = item.carType;
    this.navCtrl.push(LevelDetailPage, { 'carId' : carId, 'carType' : carType });
  }

  reactive(item) {
    this.carProvider.carReactivate(item.deviceBoxId).then((data)=>{
      console.log(data)
      if (data.msg == "成功") {
        this.toastProvider.show("车辆再激活成功",'success');
        this.navCtrl.push(LevelPage);
        this.items.clear();
        this.getCarList(0);
      } else {
        this.toastProvider.show("车辆再激活失败",'errors');
        return;
      }
    }).catch((err)=>{
      return;
    });

  }

  level(item) {
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
              cssClass: 'my-alert-danger',
              handler: data => {
                this.carProvider.carLevelChange(item.carId, data.level).then((data)=>{
                  if (data.msg == "成功") {
                    this.toastProvider.show("设置等级成功",'success');
                  } else {
                    this.toastProvider.show("设置等级失败",'errors');
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

  locate(item) {
    this.navCtrl.push(LevelLocatePage, {'deviceBoxId':item.deviceBoxId});
  }

  information(item) {
    this.navCtrl.push(LevelInformationPage, {'deviceBoxId' : item.deviceBoxId});
  }

}
