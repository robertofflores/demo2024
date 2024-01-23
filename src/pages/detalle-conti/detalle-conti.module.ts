import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleContiPage } from './detalle-conti';

@NgModule({
  declarations: [
    DetalleContiPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleContiPage),
  ],
})
export class DetalleContiPageModule {}
