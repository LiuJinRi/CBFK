import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelInformationPage } from './level-information';

@NgModule({
  declarations: [
    LevelInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(LevelInformationPage),
  ],
})
export class LevelInformationPageModule {}
