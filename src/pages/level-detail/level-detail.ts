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

  getCarDetail() {
    this.carProvider.detailCarMsg(this.carId, this.carType).then((data)=>{
      console.log(data);
      this.car = data;
      this.car.coverPic = "http://114.116.82.170:8200" + this.car.coverPic;
    }).catch((err)=>{
      return;
    });

  }

}
