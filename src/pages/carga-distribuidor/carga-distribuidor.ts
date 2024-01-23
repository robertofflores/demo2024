import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FileUploader } from "ng2-file-upload";

const URL = 'http://localhost:3000/api/upload';
/**
 * Generated class for the CargaDistribuidorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carga-distribuidor',   
  templateUrl: 'carga-distribuidor.html',
})
export class CargaDistribuidorPage {
  uploader:FileUploader;
  carpeta="";
  indice=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uploader = new FileUploader({
      url: URL, // url del php que trata el fichero subido
      method: 'POST',
      removeAfterUpload: true, // lo quita de la lista una vez su subida fue correcta
      queueLimit: 100 // limite de archivos que se pueden añadir a la lista, si el numero de archivos seleccionados es superior se cogen los x primeros.
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargaDistribuidorPage');
  }
}
