import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoCinopePage } from './nuevo-cinope';

@NgModule({
  declarations: [
    NuevoCinopePage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoCinopePage),
  ],
})
export class NuevoCinopePageModule {}
