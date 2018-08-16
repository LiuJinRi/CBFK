import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkSimilarDetailPage } from './park-similar-detail';

@NgModule({
  declarations: [
    ParkSimilarDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkSimilarDetailPage),
  ],
})
export class ParkSimilarDetailPageModule {}
