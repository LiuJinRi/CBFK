import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { CarProvider } from '../../providers/car/car';

/**
 * Generated class for the ParkSimilarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-similar-detail',
  templateUrl: 'park-similar-detail.html',
})
export class ParkSimilarDetailPage {
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

  constructor(public navCtrl: NavController,
    public carProvider : CarProvider,
    public storage : Storage,
    public navParams : NavParams,
    public toastProvider : ToastProvider,
    public popoverCtrl : PopoverController) {
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
      this.doubtPicture = "http://114.116.82.170:8200" + this.navParams.get('doubtPicture');
      this.cardNumber = this.navParams.get('cardNumber');
      this.doorNumber = this.navParams.get('doorNumber');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkSimilarDetailPage');
  }

}
