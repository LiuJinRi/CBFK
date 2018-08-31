import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { ParkDetailPage } from '../park-detail/park-detail';

/**
 * Generated class for the ParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-park',
  templateUrl: 'park.html',
})
export class ParkPage {
  public items: any = [];
  public perPage: number = 10;
  public searchText:string = null;
  public findForm: FormGroup;
  public sysUserId : string = null;
  organizationId : string = null;

  constructor(public navCtrl: NavController,
    public carProvider : CarProvider,
    private formBuilder: FormBuilder,
    public storage : Storage,
    public toastProvider : ToastProvider) {
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
    this.carProvider.carParkList(page, this.perPage, this.organizationId).then((data) => {
        console.log(data.rows);
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
      this.carProvider.findCarMsg(val, 3, this.sysUserId, this.organizationId).then((data)=>{
        console.log(data);
        this.items = data.rows;
      }).catch((err)=>{
        return;
      });
    }
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
    var doubtPicture = item.doubtPicture || null;
    var cardNumber = item.cardNumber;
    var doorNumber = item.doorNumber;

    this.navCtrl.push(ParkDetailPage, { 
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
      'doubtPicture' : doubtPicture,
      'cardNumber' : cardNumber,
      'doorNumber' : doorNumber
    });

  }
  
}
