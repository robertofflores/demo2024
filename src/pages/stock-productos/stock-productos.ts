import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';

/**
 * Generated class for the StockProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-productos',
  templateUrl: 'stock-productos.html',
})
export class StockProductosPage {
  disponibles
  codigo=""
  imagen
  nomProd

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockProductosPage');
    this.codigo = 'L 010061X700M1304';
  }

  obtenerStock(){
     this.cargaImagen();
     this.obtenerNomProd();
    let postDataProducto = '{ "codigo" : "'+ this.codigo +'" }';
      this.provedor.obtenerStock(postDataProducto)
      .subscribe(data => {
      this.disponibles = data;
      console.log(data);},
      err => {
      console.log(err);
      })
    
  }

  cargaImagen(){
  this.imagen = [{image:"/assets/imgs/pantalon1.jpg"},
    {image:"/assets/imgs/pantalon2.jpg"},
    {image:"/assets/imgs/pantalon3.jpg"}];
  //this.imagen[1] = "/assets/imgs/pantalon2.jpg";
  }

  obtenerNomProd(){
      let postDataProducto = '{ "codigo" : "'+ this.codigo +'" }';
      this.provedor.obtenerNomProd(postDataProducto)
      .subscribe(data => {
      this.nomProd = data;
      console.log(data);},
      err => {
      console.log(err);
      })
    
  }
}


