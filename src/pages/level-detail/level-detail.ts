import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ActionSheetController } from 'ionic-angular';
import { LevelmenuPage } from '../levelmenu/levelmenu';
import { CarProvider } from './../../providers/car/car';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the LevelDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private actionSheetCtrl : ActionSheetController) { 
      
      this.carId  = this.navParams.get('carId');
      this.carType = this.navParams.get('carType');
      console.log(this.carId);
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
      this.car.coverPic = "http://114.116.82.170/" + this.car.coverPic;
    }).catch((err)=>{
      return;
    });

  }

}
