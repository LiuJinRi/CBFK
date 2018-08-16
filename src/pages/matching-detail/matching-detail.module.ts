import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchingDetailPage } from './matching-detail';

@NgModule({
  declarations: [
    MatchingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchingDetailPage),
  ],
})
export class MatchingDetailPageModule {}
