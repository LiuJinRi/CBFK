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

  constructor(
    private storage : Storage
  ) {
    storage.get('organizationName').then((data) => { 
      if (data) {
        this.organizationName = data;
        //console.log(this.organizationName);
      }

      if ( this.organizationName == null ) {
        this.isEnable = false;
      } else {
        this.isEnable = true;
      }
    });
  }

  ionViewDidEnter() {
    
  }


}
