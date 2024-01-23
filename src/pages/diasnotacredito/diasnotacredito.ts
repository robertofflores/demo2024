import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the DiasnotacreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diasnotacredito',
  templateUrl: 'diasnotacredito.html',
})
export class DiasnotacreditoPage {

  datosSucu;
  mensaje:string='';
  clase:string='';
  numdiasncre:string='';
  datosEmpresa;
  datosUsuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provedor:Proveedor1Provider,
      public toastCtrl:ToastController, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiasnotacreditoPage');
    this.cargaSucu();
    this.cargaDatosEmpresa();
    this.cargaDatosUsuario();
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

  presentToast(){
    const toast = this.toastCtrl.create({
      message: this.mensaje,
      duration: 3000,
      cssClass: this.clase
    });
    toast.present();
  }

  actualizarDias(sucu,numDias){
    if(this.validarDatos(numDias)){
        let postCambiar= '{ "codigo" : '+ sucu + ', "numdiasncre" : '+ parseInt(numDias) + '}';
        this.provedor.actualizarNumDias(postCambiar)
        .subscribe(data => {
          if(data){
            this.mensaje = "Exito! Datos han sido Grabados.";
             this.clase = "success"
             this.presentToast();
          }},
          err => {
            console.log(err);
          
        })
    }
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



  validarDatos(numDias){
    if(numDias.length == 0){
      this.mensaje = "* Ingrese el Número de Días.";
      this.clase = "danger"
      this.presentToast();
      return;
    }

    if (numDias.length > 0){
      for (var i=0; i<numDias.length; i++ ){
      
      if (isNaN(parseInt(numDias.substr(i,1)))){
        this.mensaje = "* Campo sólo admite Números.";
        this.clase = "danger"
        this.presentToast();
        return;
      }
      
      }
      
      if(numDias.length > 0 && numDias > 365){
        this.mensaje = "* Campo sólo admite Números de 0 a 365.";
        this.clase = "danger"
        this.presentToast();
        return;
      }
    }
return true;   
    
  }

  

}
