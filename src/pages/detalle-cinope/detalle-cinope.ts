import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { Storage } from "@ionic/storage";
import { NuevoCinopePage } from '../nuevo-cinope/nuevo-cinope';


/**
 * Generated class for the DetalleCinopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-cinope',
  templateUrl: 'detalle-cinope.html',
})
export class DetalleCinopePage {
  datosCinope;
  datos;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider, public stogare: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleCinopePage');
    this.cargaCinope();
  }

  cargaCinope(){
    this.stogare.get('gdetCinope').then((data) => {
      if(data != null)
      {
       console.log(data);
       this.datos = data;
    let postDataCinope = '{ "codigo": ' + this.datos + ' }';
    this.provedor.obtenerCinope(postDataCinope)
   .subscribe(data => {
   this.datosCinope = data;
   console.log(data);},
   err => {
   console.log(err);
  })

}
});
}

goPage(){
   this.navCtrl.push(NuevoCinopePage);
}


}