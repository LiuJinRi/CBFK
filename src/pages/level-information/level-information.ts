import { Component } from '@angular/core';
import { CarProvider } from './../../providers/car/car';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  //获取最新信息
  getNewsList() {
    var items_tmp = [];
    this.items = items_tmp;
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

  //过滤项目
  filterItems(ev: any) {
    
    let val = ev.target.value;
    
    if (val && val.trim() != '') { 
      this.items = this.items.filter( function(item) {
        console.log(item.msgs.toLowerCase());
        return item.msgs.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      var items_tmp = [];
      this.items = items_tmp;
      this.getNewsList();
    }
  }

}
