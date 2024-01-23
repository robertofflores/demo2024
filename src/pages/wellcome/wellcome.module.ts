import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellcomePage } from './wellcome';

@NgModule({
  declarations: [
    WellcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WellcomePage),
  ],
})
export class WellcomePageModule {}
