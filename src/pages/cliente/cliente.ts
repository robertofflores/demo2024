import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';

/**
 * Generated class for the ClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  clientes

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provedor: Proveedor1Provider) {
  }

  ionViewDidLoad() {
    this.provedor.obtenerDatos()
        .subscribe(data => {
        this.clientes = data;
        console.log(data);
      },err => {
        console.log(err);
      }
     )
  }

}
