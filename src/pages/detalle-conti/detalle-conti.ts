import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { Storage } from "@ionic/storage";
import { DetalleCinopePage } from '../detalle-cinope/detalle-cinope';

/**
 * Generated class for the DetalleContiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-conti',
  templateUrl: 'detalle-conti.html',
})
export class DetalleContiPage {
  datosDconti;
  datos;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
      public provedor: Proveedor1Provider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleContiPage');
    this.recuperaDetalles();
  }

  goPage(codigo){
    this.storage.set('gdetCinope',codigo);
    this.navCtrl.push(DetalleCinopePage);
  }

  recuperaDetalles(){
  this.storage.get('gdetConti').then((data) => {
    if(data != null)
    {
     console.log(data);
     this.datos = data;
     let postDConti = '{ "codigoProd": ' + this.datos + '}';
    console.log(postDConti);
     this.provedor.obtenerDconti(postDConti)
    .subscribe(data => {
    this.datosDconti = data;
    console.log(data);
  },err => {
    console.log(err);
  })

}
});
}
}
