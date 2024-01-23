import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";

/**
 * Generated class for the NuevoCinopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-cinope',
  templateUrl: 'nuevo-cinope.html',
})
export class NuevoCinopePage {
  datosOpera;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoCinopePage');
    this.cargaOperaciones();
  }

cargaOperaciones(){
  this.provedor.obtenerCodProd()
    .subscribe(data => {
    this.datosOpera = data;
    console.log(data);},
    err => {
    console.log(err);
  })
}

}
