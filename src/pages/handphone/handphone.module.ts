import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandphonePage } from './handphone';

@NgModule({
  declarations: [
    HandphonePage,
  ],
  imports: [
    IonicPageModule.forChild(HandphonePage),
  ],
})
export class HandphonePageModule {}
