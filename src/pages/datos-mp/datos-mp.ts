import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider  } from "../../providers/proveedor1/proveedor1";
import { Storage } from "@ionic/storage";
import { LoadingController,ToastController } from "ionic-angular";


/**
 * Generated class for the DatosMpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-mp',
  templateUrl: 'datos-mp.html',
})
export class DatosMpPage {
  datosMP;
  datosEmpresa;
  datosUsuario;
  isenabled:boolean=true;
  datosCcos;
  numComp;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor: Proveedor1Provider, private storage:Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosMpPage');
    this.presentLoading();
    this.cargaDatosMP();
    this.cargaDatosEmpresa();
    this.cargaDatosUsuario();
    this.cargaCcosto();
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Se ha Procesado con Éxito.',
      duration: 5000
      });
    toast.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Recuperando Información...",
      duration: 1200
    });
    loader.present();
  }

  removePost(dato){
    let index = this.datosMP.indexOf(dato);

    if(index > -1){
      this.datosMP.splice(index, 1);
    }
}

muestraDet(numero){
  if (this.numComp == numero){
    this.numComp = null;
  }else{
    this.numComp = numero;
  }
}

cargaCcosto(){
  this.storage.get('gusuario').then((val) => {
    let usua = val;
    let postDataUsuario = '{ "usuario" : "'+ usua + '"}';
  this.provedor.obtenerCCosto(postDataUsuario)
  .subscribe(data => {
  this.datosCcos = data;
  console.log(data);},
  err => {
  console.log(err);
  })
});
}

  cargaDatosMP(){
    this.storage.get('gusuario').then((val) => {
      let usua = val;
      let postDataMP = '{ "usuario" : "'+ usua + '"}';
    this.provedor.obtenerDatosMP(postDataMP)
    .subscribe(data => {
    this.datosMP = data;
    console.log(data);},
    err => {
    console.log(err);
    })
  });
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

  marcaRecibido(numeroComp,numeroDmov,codigoProd,dato){
    this.storage.get('gusuario').then((val) => {
      let usua = val;
      let postDataMP = '{ "numeroComp":'+ numeroComp +',"numeroDmov":'+numeroDmov+',"codigoProd":"'+codigoProd+'","usuario":"'+usua+'"}';
      this.provedor.recibirMP(postDataMP)
    .subscribe(data => {
      if (data){
      this.removePost(dato);
      this.presentToast();
    //this.datosUsuario = data;

    console.log(data);}},
    err => {
    console.log(err);
    })
    });
  }

  marcaTodoRecibido(numeroComp,dato){
    this.storage.get('gusuario').then((val) => {
      let usua = val;
      let postDataMP = '{ "numeroComp":'+ numeroComp +',"usuario":"'+usua+'"}';
      this.provedor.recibirTodoMP(postDataMP)
    .subscribe(data => {
      if (data){
      this.removePost(dato);
      this.presentToast();
    //this.datosUsuario = data;

    console.log(data);}},
    err => {
    console.log(err);
    })
    });
  }

}
