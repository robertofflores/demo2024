import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosMpPage } from './datos-mp';

@NgModule({
  declarations: [
    DatosMpPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosMpPage),
  ],
})
export class DatosMpPageModule {}
