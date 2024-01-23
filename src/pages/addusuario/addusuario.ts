import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddusuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addusuario',
  templateUrl: 'addusuario.html',
})
export class AddusuarioPage {
  nombre = '';
  cedula = '';
  usuario = '';
  password = '';
  estado = '';
  usuarios;
  resp: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provedor:Proveedor1Provider, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddusuarioPage');
    this.estado='A';
  }

  postDataUsuario(){
    let postDataUsuario = '{"nombre": "' + this.nombre + '","usuario": "' + this.usuario + '","password": "' + this.password + '","estado": "' + this.estado + '","cedula": "'+ this.cedula +'"}';
    console.log(postDataUsuario);
    this.provedor.validarDatosLoggin(postDataUsuario)
    .subscribe(result => {
     this.usuarios = result;
     for (let empleado of this.usuarios) {
      this.resp = empleado.cedula;
     }
     console.log(this.resp+ ' '+this.cedula)
     if (this.resp == this.cedula) {
      this.presentAlertValida('Advertencia!','Usuario Ya existe.');
     }
     else {
      this.registraUsuario(postDataUsuario)
     }
     
   },err => {
     console.log(err);
   }
   
  )
 }
   
 registraUsuario(postData){
    this.provedor.enviarDatosUsuario(postData) 
   .subscribe(result => {
     if(result){
        this.presentAlertValida("Exito!","Usuario ha sido Ingresado.");
        this.nombre='';
        this.usuario='';
        this.password='';
        this.cedula='';
     }
   },err => {
          console.log(err);
        }
   )
     
 }
 
presentAlertValida(titulo:string, subtitulo:string) {
   let alert = this.alertCtrl.create({
     title: titulo,
     subTitle: subtitulo,
     buttons: ['OK']
   });
   alert.present();
 }



}
