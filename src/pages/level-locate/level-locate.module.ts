import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelLocatePage } from './level-locate';

@NgModule({
  declarations: [
    LevelLocatePage,
  ],
  imports: [
    IonicPageModule.forChild(LevelLocatePage),
  ],
})
export class LevelLocatePageModule {}
