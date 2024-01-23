import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleCinopePage } from './detalle-cinope';

@NgModule({
  declarations: [
    DetalleCinopePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleCinopePage),
  ],
})
export class DetalleCinopePageModule {}
