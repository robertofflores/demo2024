import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuarios;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: Proveedor1Provider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
    this.getData();
  }

  getData(){
    this.provedor.obtenerDatosUsuario()
        .subscribe(data => {
        this.usuarios = data;
        console.log(data);
      },err => {
        console.log(err);
      }
     )
  }

}
