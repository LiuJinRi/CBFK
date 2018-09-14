import { Component, ViewChild} from '@angular/core';
import { MatchingPage } from '../matching/matching';
import { LevelPage } from '../level/level';
import { ParkPage } from '../park/park';
import { MinePage } from '../mine/mine';
import {Storage} from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = MatchingPage;
  tab2Root = LevelPage;
  tab3Root = ParkPage;
  tab4Root = MinePage;
  organizationName : string;
  isEnable : boolean = true;
  status : string;
  tabindex : number;

  constructor(
    private storage : Storage,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {
    

    storage.get('status').then((data) => { 
      //console.log(data);
      //if (data) {
        this.status = data;
        //console.log(this.status);
      //}
      if ( this.status != "3" ) {
        this.isEnable = false;
      } 

      //this.isEnable = true;
    });

    if (this.navParams.data) {
      this.tabindex = this.navParams.get('tabindex');
    }
  }
}
