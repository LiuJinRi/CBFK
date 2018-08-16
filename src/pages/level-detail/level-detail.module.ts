import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelDetailPage } from './level-detail';

@NgModule({
  declarations: [
    LevelDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LevelDetailPage),
  ],
})
export class LevelDetailPageModule {}
