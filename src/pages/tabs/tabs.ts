import { Component} from '@angular/core';
import { MatchingPage } from '../matching/matching';
import { LevelPage } from '../level/level';
import { ParkPage } from '../park/park';
import { MinePage } from '../mine/mine';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = MatchingPage;
  tab2Root = LevelPage;
  tab3Root = ParkPage;
  tab4Root = MinePage;
  organizationName : string;
  isEnable : boolean;
  status : string;

  constructor(
    private storage : Storage
  ) {
    storage.get('status').then((data) => { 
      console.log(data);
      //if (data) {
        this.status = data;
        console.log(this.status);
      //}


      if ( this.status != "3" ) {
        this.isEnable = false;
      } else {
        this.isEnable = true;
      }

    });
  }

  ionViewDidEnter() {
    
  }


}
