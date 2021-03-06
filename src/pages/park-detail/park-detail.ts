import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { CarProvider } from '../../providers/car/car';
import { ParkSimilarDetailPage } from '../park-similar-detail/park-similar-detail';
import { ParkMenuPage } from '../park-menu/park-menu';
/**
 * Generated class for the ParkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-detail',
  templateUrl: 'park-detail.html',
})
export class ParkDetailPage {
  items: any = [];
  perPage: number = 10;
  marketDoubtId : string = null;
  carId : string = null;
  carNumberPlate : string = null;
  vincode : string = null;
  createTime : string = null;
  shopNumber : string = null;
  shopContractorName : string = null;
  contactNumber : string = null;
  handleTime : string = null;
  handleResult : string = null;
  handlePersonName : string = null;
  doubtPicture : string = null;
  cardNumber : string = null;
  doorNumber : string = null;
  car : any = {};
  sysUserId : string = null;
  organizationId : string = null;
  pic_url : string = null;

  constructor(public navCtrl: NavController,
    public carProvider : CarProvider,
    public storage : Storage,
    public navParams : NavParams,
    public toastProvider : ToastProvider,
    public popoverCtrl : PopoverController,
    private httpProvider : HttpProvider) {
      this.marketDoubtId = this.navParams.get('marketDoubtId');
      this.carId = this.navParams.get('carId');
      this.carNumberPlate = this.navParams.get('carNumberPlate');
      this.vincode = this.navParams.get('vincode');
      this.createTime = this.navParams.get('createTime');
      this.shopNumber = this.navParams.get('shopNumber');
      this.shopContractorName = this.navParams.get('shopContractorName');
      this.contactNumber = this.navParams.get('contactNumber');
      this.handleTime = this.navParams.get('handleTime');
      this.handleResult = this.navParams.get('handleResult');
      this.handlePersonName = this.navParams.get('handlePersonName');
      this.doubtPicture = this.httpProvider.PIC_URL + this.navParams.get('doubtPicture');
      this.cardNumber = this.navParams.get('cardNumber');
      this.doorNumber = this.navParams.get('doorNumber');
      this.organizationId = this.navParams.get('organizationId');

      storage.get('sysUserId').then((data) => { 
        if (data) {
          this.sysUserId = data;
        }
      });

      this.pic_url = this.httpProvider.PIC_URL;
    }

  presentPopover(myEvent) {   
    let popover = this.popoverCtrl.create(ParkMenuPage, {
      sysUserId: this.sysUserId,
      marketDoubtId: this.marketDoubtId
    });
    popover.present({
      ev: myEvent
    });

  }

  ionViewWillEnter(){
    this.getCarList(0);
  }

  getCarList(page) {
    this.carProvider.carParkSimilarList(page, this.perPage, this.carId, this.organizationId, this.vincode ).then((data) => {
        console.log(data.rows);
        
        var items_tmp = [];
        if (data) {
          if ( page == 0) {
            this.items = items_tmp;
          }
          if (this.items.length == 0) {
              this.items = data.rows.beSimilarCarList;               
          } else {
              this.items = this.items.concat(data.rows.beSimilarCarList);
          }

          this.car = data.rows.carMsgList[0];
          console.log(this.car);
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

  detail( item ) {   
    var marketDoubtId = item.marketDoubtId;
    var carId = item.carId;
    var carNumberPlate = item.carNumberPlate;
    var vincode = item.vincode;
    var createTime = item.createTime;
    var shopNumber = item.shopNumber;
    var shopContractorName = item.shopContractorName;
    var contactNumber = item.contactNumber;
    var handleTime = item.handleTime;
    var handleResult = item.handleResult;
    var handlePersonName = item.handlePersonName;
    var coverPic = item.coverPic;
    console.log(coverPic);
    var cardNumber = item.cardNumber;
    var doorNumber = item.doorNumber;

    this.navCtrl.push(ParkSimilarDetailPage, { 
      'carId' : carId, 
      'marketDoubtId' : marketDoubtId, 
      'carNumberPlate' : carNumberPlate,
      'vincode' : vincode, 
      'createTime' : createTime,
      'shopNumber' : shopNumber, 
      'shopContractorName' : shopContractorName,
      'contactNumber' : contactNumber, 
      'handleTime' : handleTime,
      'handleResult' : handleResult,
      'handlePersonName' : handlePersonName, 
      'coverPic' : coverPic,
      'cardNumber' : cardNumber,
      'doorNumber' : doorNumber
    });
  }

}
