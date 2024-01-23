import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockProductosPage } from './stock-productos';

@NgModule({
  declarations: [
    StockProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(StockProductosPage),
  ],
})
export class StockProductosPageModule {}
