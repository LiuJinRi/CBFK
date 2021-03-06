import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams, ViewController } from 'ionic-angular';
import { MacthingmenuPage } from '../macthingmenu/macthingmenu';
import { CarProvider } from './../../providers/car/car';
import {Storage} from '@ionic/storage';


/**
 * Generated class for the MatchingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-matching-detail',
  templateUrl: 'matching-detail.html',
})
export class MatchingDetailPage {
  car : any = {};
  carId : string = null;
  carType : string = null;
  sysUserId : string = null;
  organizationId : string = null;

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public carProvider : CarProvider,
    public viewController : ViewController,
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
  //显示菜单
  presentPopover(myEvent) { 
    
    let popover = this.popoverCtrl.create(MacthingmenuPage, {
      boxCode: this.car.boxCode,
      carId: this.carId,
      sysUserId: this.sysUserId,
      vincode: this.car.vincode,
      deviceBoxId: this.car.deviceBoxId
    });
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    this.getCarDetail();
  }
  //详情
  getCarDetail() {
    this.carProvider.detailCarMsg(this.carId, this.carType, this.organizationId).then((data)=>{
      console.log(data);
      this.car = data;
      this.car.coverPic = this.httpProvider.PIC_URL + this.car.coverPic;
    }).catch((err)=>{
      return;
    });

  }
}

