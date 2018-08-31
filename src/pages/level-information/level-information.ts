import { Component } from '@angular/core';
import { CarProvider } from './../../providers/car/car';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LevelInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-level-information',
  templateUrl: 'level-information.html',
})
export class LevelInformationPage {
  deviceBoxId : string = null;
  items: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carProvider : CarProvider) {
    this.deviceBoxId  = this.navParams.get('deviceBoxId');
  }

  ionViewDidLoad() {
    this.getNewsList();
  }

  getNewsList() {
    this.carProvider.carInformation(this.deviceBoxId).then((data) => {
      console.log(data);
        if (data) {
            if (this.items.length == 0) {
                this.items = data.rows;
            } else {
                this.items = this.items.concat(data.rows);
            }
        }
    });
  }

}
