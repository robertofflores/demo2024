import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the HabiDescuentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habi-descuento',
  templateUrl: 'habi-descuento.html',
})
export class HabiDescuentoPage {
  datosSucu;
  habi:boolean=false;
  est:number;
  datosEmpresa;
  datosUsuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider, public loadingCtrl:LoadingController,
    private storage: Storage) {
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Actualizando Datos...",
      duration: 1000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabiDescuentoPage');
    this.cargaSucu();
    this.cargaDatosUsuario();
    this.cargaDatosEmpresa();
  }

  cargaSucu(){
    this.provedor.obtenerSucu()
    .subscribe(data => {
    this.datosSucu = data;
    console.log(data);
        },
    err => {
    console.log(err);
    })
  }

 cambiarEstado(sucu,estado){
  // this.presentLoading();
    console.log(sucu + ' ' +estado)
    if(estado){
      this.est = 1;
    }else{
      this.est = 0;
    }
    let postCambiar = '{ "codigo" : '+ sucu + ', "habilitar" : '+this.est+' }';
      this.provedor.cambiarEstado(postCambiar)
    .subscribe(data => {
     console.log(data);
     //this.cargaSucu();
    },
    err => {
    console.log(err);
    })
    }

    cargaDatosEmpresa(){
      this.storage.get('gempresa').then((val) => {
        let empr = val;
        let postDataEmpresa = '{ "codigo" : '+ empr + '}';
        this.provedor.obtenerDatosEmpresa(postDataEmpresa)
      .subscribe(data => {
      this.datosEmpresa = data;
      console.log(data);},
      err => {
      console.log(err);
      })
      });
    }
  
   
  
      cargaDatosUsuario(){
        this.storage.get('gusuario').then((val) => {
          let usua = val;
          let postDataUsuario = '{ "usuario" : "'+ usua + '"}';
          this.provedor.obtenerDatosUsuarioMbl(postDataUsuario)
        .subscribe(data => {
        this.datosUsuario = data;
        console.log(data);},
        err => {
        console.log(err);
        })
        });
      
      }
    

}
