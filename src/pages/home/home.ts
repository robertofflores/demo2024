import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';
import { AlertController } from 'ionic-angular';
import { ClientePage } from '../cliente/cliente';
import { ModuloPage } from '../modulo/modulo'
import { AddusuarioPage } from '../addusuario/addusuario'
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios;
  result;
  data:string;
  numeroCliente:string;
  usuario: '';
  password='';
  resp=false;
  isenabled:boolean=false;

  
  constructor(public navCtrl: NavController,
    public provedor:Proveedor1Provider,
    private alertCtrl: AlertController,private storage:Storage
    ) {}

    ionViewDidLoad() {
      this.storage.remove('gusuario');
      this.storage.remove('gempresa');
  } 

 

  goCliente():void{
    this.navCtrl.push(ClientePage);

  }

  goModulo():void{
    this.navCtrl.push(ModuloPage);
  }

  goAddusuario():void{
    this.navCtrl.push(AddusuarioPage);
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

  postDataLoggin(){
   let postDataLoggin = '{"usuario": "' + this.usuario + '","password": "' + this.password + '"}';
   this.provedor.validarLoggin(postDataLoggin)
   .subscribe(result => {
    this.usuarios = result;
    for (let empleado of this.usuarios) {
     this.resp = empleado.uservalido;
    }
    console.log(this.resp)
    if (this.resp) {
      this.storage.set('gusuario',this.usuario);
      this.storage.set('gempresa',1);
      this.goModulo();
    }
    else {
      this.storage.set('gusuario','');
      this.presentAlertValida('Advertencia!','Sus Credenciales no son correctas.');
    }
    
  },err => {
    console.log(err);
    var errorMessage: string = err.message;
    this.presentAlertValida('ErrorConectiii!', errorMessage
     );
  }
  
 )
}
  

// postData(){
//  let postData='{"Nombre": "JUAN 1000","Direccion": "MARISCAL","Telefono": "111111111","Estado": "M"}';
//  this.provedor.enviarDatos(postData) 
//   .subscribe(result => {
//       console.log(result);
//       this.presentAlertM("MMM");
//   },err => {
//          console.log(err);
//        }
//   )
    
// }

presentAlertValida(titulo:string, subtitulo:string) {
  let alert = this.alertCtrl.create({
    title: titulo,
    subTitle: subtitulo,
    buttons: ['OK']
  });
  alert.present();
}

presentAlertM(datos:string) {
  let alert = this.alertCtrl.create({
    title: 'Exito!',
    subTitle: 'El Usuario ' + datos + ' Ha sido Ingesado Correctamente.',
    buttons: ['OK']
  });
  alert.present();
}

presentAlertD(datos:string) {
  let alert = this.alertCtrl.create({
    title: 'Exito!',
    subTitle: 'El Usuario ' + datos + ' Ha sido Eliminado.',
    buttons: ['OK']
  });
  alert.present();
}


deleteData(){
  let id=1;
  this.provedor.eliminarDatos(id) 
   .subscribe(result => {
       console.log(result);
       this.presentAlertD("EEE");
   },err => {
          console.log(err);
        }
   )

}

} 
