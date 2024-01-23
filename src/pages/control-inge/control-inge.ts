import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { DetalleContiPage } from "../../pages/detalle-conti/detalle-conti";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the ControlIngePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control-inge',
  templateUrl: 'control-inge.html',
})
export class ControlIngePage {
  datosCodProd;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlIngePage');
    this.cargaCodProd()
  }

  cargaCodProd(){
     this.provedor.obtenerCodProd()
    .subscribe(data => {
    this.datosCodProd = data;
    console.log(data);},
    err => {
    console.log(err);
  })
}


  goPage(codigo){
    this.storage.set('gdetConti',codigo);
    this.navCtrl.push(DetalleContiPage);
  }

}
