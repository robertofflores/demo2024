import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControlIngePage } from './control-inge';




@NgModule({
  declarations: [
    ControlIngePage,
    
  ],
  imports: [
    IonicPageModule.forChild(ControlIngePage)
  ],
  exports: [
  ]
})
export class ControlIngePageModule {}
