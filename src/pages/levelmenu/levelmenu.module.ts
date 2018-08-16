import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelmenuPage } from './levelmenu';

@NgModule({
  declarations: [
    LevelmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(LevelmenuPage),
  ],
})
export class LevelmenuPageModule {}
