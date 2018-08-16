import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkMenuPage } from './park-menu';

@NgModule({
  declarations: [
    ParkMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkMenuPage),
  ],
})
export class ParkMenuPageModule {}
