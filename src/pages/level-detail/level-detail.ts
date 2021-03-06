import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ActionSheetController } from 'ionic-angular';
import { LevelmenuPage } from '../levelmenu/levelmenu';
import { CarProvider } from './../../providers/car/car';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-level-detail',
  templateUrl: 'level-detail.html',
})
export class LevelDetailPage {
  car : any = {};
  carId : string = null;
  carType : string = null;
  sysUserId : string = null;
  organizationId : string = null;

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    private storage: Storage,
    private httpProvider : HttpProvider) { 
      
      this.carId  = this.navParams.get('carId');
      this.carType = this.navParams.get('carType');
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LevelmenuPage, {
      carId: this.carId,
      dangerLevel: this.car.dangerLevel,
      deviceBoxId: this.car.deviceBoxId
    });
    
    popover.present({
      ev: myEvent
    });

  }

  ionViewDidLoad() {
    this.getCarDetail();
  }

  ionViewWillEnter() {
    this.getCarDetail();
  }

  getCarDetail() {
    this.carProvider.detailCarMsg(this.carId, this.carType, this.organizationId).then((data)=>{
      console.log(data);
      this.car = ''; 
      this.car = data;
      this.car.coverPic = this.httpProvider.PIC_URL + this.car.coverPic;
    }).catch((err)=>{
      return;
    });

  }

}
