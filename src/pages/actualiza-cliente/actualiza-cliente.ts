import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1'
import { AlertController } from 'ionic-angular';
import { AddclientePage } from "../../pages/addcliente/addcliente";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the ActualizaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualiza-cliente',
  templateUrl: 'actualiza-cliente.html',
})
export class ActualizaClientePage {
  codigo=''
  ruc=''
  nombre=''
  apellido=''
  email=''
  direccion=''
  celular=''
  telefono=''
  fNacimiento=''
  isenabled:boolean=false;
  existe:boolean=false;
  clientes;
  datosEmpresa;
  datosUsuario;
  msjRuc='';
  msjNombre='';
  msjApellido='';
  msjEmail='';
  msjDireccion='';
  msjCelular='';
  msjTelefono='';
  msjFNacimiento='';
  fechaActual='';
  prefiereTelefono='';
  prefiereCelular='';
  prefiereEmail='';
  prefiereFechaNacimiemto='';
  showRuc:boolean=false;
  showNombre:boolean=false;
  showApellido:boolean=false;
  showEmail:boolean=false;
  showDireccion:boolean=false;
  showCelular:boolean=false;
  showTelefono:boolean=false;
  showFNacimiento:boolean=false;
  li_valor:number=0;
  li_suma:number=0;
  lb_exito:boolean=false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provedor:Proveedor1Provider,private alertCtrl: AlertController,
    private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizaClientePage');
    this.cargaDatosEmpresa();
    this.cargaDatosUsuario();
    this.limpiarDatos();
    this.ruc='';
  }

  validarDatos(){
    if (this.nombre.length == 0){
      this.showNombre=true;
      this.msjNombre='* Campo requerido.';
      return;
    }else{
    this.showNombre=false;
    }
  
    if (this.nombre.length > 0){
      var re = /^[a-zA-ZñÑ ]{3,50}$/;
     if(!re.test(String(this.nombre))){
      this.showNombre=true;
      this.msjNombre='* Campo sólo admite Letras y espacios. Longitud 3 a 50.';
      return;
    }else{
    this.showNombre=false;
     }
    }
  
    if (this.apellido.length == 0){
      this.showApellido=true;
      this.msjApellido='* Campo requerido.';
      return;
    }else{
    this.showApellido=false;
    }
  
    if (this.apellido.length > 0){
      re = /^[a-zA-ZñÑ ]{3,50}$/;
     if(!re.test(String(this.apellido))){
      this.showApellido=true;
      this.msjApellido='* Campo sólo admite Letras y espacios. Longitud 3 a 50.';
      return;
    }else{
    this.showApellido=false;
     }
    }
  
  // if (this.email.length == 0){
  //   this.showEmail=true;
  //   this.msjEmail='* Campo requerido.';
  //   return;
  // }else{
  // this.showEmail=false;
  // }
  
  
  if (this.email.length > 0){
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(!re.test(String(this.email).toLowerCase())){
    this.showEmail=true;
    this.msjEmail='* Email no válido.';
    return;
  }else{
  this.showEmail=false;
   }
  }
  
  // if (this.direccion.length == 0){
  //   this.showDireccion=true;
  //   this.msjDireccion='* Campo requerido.';
  //   return;
  // }else{
  // this.showDireccion=false;
  // }
  
  
  // if (this.celular.length == 0){
  //   this.showCelular=true;
  //   this.msjCelular='* Campo requerido.';
  //   return;
  // }else{
  // this.showCelular=false;
  // }
  
  if (this.celular.length > 0){
    for (var i=0; i<this.celular.length; i++ ){
    
    if (isNaN(parseInt(this.celular.substr(i,1)))){
      this.showCelular=true;
      this.msjCelular='* Campo sólo admite números.';
      return;
    }
    else{
      this.showCelular=false;
    }
    }
  }

  if (this.celular.length > 0 && this.celular.length != 10){
    this.showCelular=true;
    this.msjCelular='* Longitud 10.';
    return;
  }else{
    this.showCelular=false;
  }

  if (this.celular.length > 0 && this.celular.substr(0,2) != '08' &&  this.celular.substr(0,2) != '09' ){
    console.log(this.celular.substr(0,2));
    this.showCelular=true;
    this.msjCelular='* Número Inválido diferente de [08,09].';
    return;
  }else{
    this.showCelular=false;
  }
  
  // if (this.telefono.length == 0){
  //   this.showTelefono=true;
  //   this.msjTelefono='* Campo requerido.';
  //   return;
  // }else{
  // this.showTelefono=false;
  // }
  
  if (this.telefono.length > 0){
    for (i=0; i<this.telefono.length; i++ ){
    
    if (isNaN(parseInt(this.telefono.substr(i,1)))){
      this.showTelefono=true;
      this.msjTelefono='* Campo sólo admite números.';
      return;
    }
    else{
      this.showTelefono=false;
    }
    }
  }

  if (this.telefono.length > 0 && this.telefono.length != 9){
    this.showTelefono=true;
    this.msjTelefono='* Longitud 9.';
    return;
  }else{
    this.showTelefono=false;
  }

  if (this.telefono.length > 0 && this.telefono.substr(0,2) != '02' &&  this.telefono.substr(0,2) != '03' && this.telefono.substr(0,2) != '04' && this.telefono.substr(0,2) != '05' && this.telefono.substr(0,2) != '06' && this.telefono.substr(0,2) != '07' ){
    this.showTelefono=true;
    this.msjTelefono='* Número Inválido diferente de [02,03,04,05,06,07].';
    return;
  }else{
    this.showTelefono=false;
  }
  
  // if (this.fNacimiento.length == 0){
  //   this.showFNacimiento=true;
  //   this.msjFNacimiento='* Campo requerido.';
  //   return;
  // }else{
  // this.showFNacimiento=false;
  // }
  
  return true;
    
  }

  validarDatosCI(){
    if (this.ruc.length == 0){
      this.showRuc=true;
      this.msjRuc='* Campo requerido.';
      return;
    }else{
    this.showRuc=false;
    }
    if (this.ruc.length > 0 && this.ruc.length != 10 && this.ruc.length != 13){
      this.showRuc=true;
      this.msjRuc='* Longitud 10 ó 13';
      return;
    }else{
      this.showRuc=false;
    }
  
  if (this.ruc.length > 0){
      for (var i=0; i<this.ruc.length; i++ ){
        if (isNaN(parseInt(this.ruc.substr(i,1)))){
        this.showRuc=true;
        this.msjRuc='* Campo sólo admite números.';
        return;
      }
      else{
        this.showRuc=false;
      }}}
    
  
    if (this.ruc.length == 10){
        if (!this.digitoVerificador(this.ruc)){
            this.showRuc=true;
            this.msjRuc='* Número de Cédula Inválido.';
            return;
        }else{
            this.showRuc=false;
    }
  }
  
  
    if(this.ruc.length == 13){
  if(!this.validaRuc(this.ruc)){
    this.showRuc=true;
    this.msjRuc='* Número de RUC Inválido.';
    return;
  }else{
    this.showRuc=false;
  }
 }
return true;
}

  validaRuc(ruc){
    var dig9_coeficientes:number[] = [4,3,2,7,6,5,4,3,2];
    var dig6_coeficientes:number[] = [3,2,7,6,5,4,3,2];
     var li_coeficientes:number[];
      const modulo11:number = 11;
      const dig_veri_6:number = 8;
      const dig_veri_9:number = 9;
   
  
      
  var li_dig_3,li_cont,li_dig_veri,li_dig_res:number=0;
  
  li_dig_3 = parseInt(this.ruc.substr(0,1));
  
  if (li_dig_3 != 7 && li_dig_3 != 8 && parseInt(this.ruc.substr(0,2)) > 0 &&  parseInt(this.ruc.substr(10,3))>0){ 
  
  
  switch (li_dig_3) {
    case 0:{
      if (!this.digitoVerificador(this.ruc.substr(0,9))){
        return false;
        }else{
          return true;
        }
      
      // break;
    }
      case 1:{
        if (!this.digitoVerificador(this.ruc.substr(0,9))){
          return false;
          }else{
            return true;
          }
        // break;
        }
      case 2:{
          if (!this.digitoVerificador(this.ruc.substr(0,9))){
            return false;
            }else{
              return true;
            }
        //  break;
      }
      case 3:{
            if (!this.digitoVerificador(this.ruc.substr(0,9))){
              return false;
              }else{
                return true;
              }
         //     break;
            }
      case 4:{
              if (!this.digitoVerificador(this.ruc.substr(0,9))){
                return false;
                }else{
                  return true;
                }
          //    break;
        } 
      case 5:{
                if (!this.digitoVerificador(this.ruc.substr(0,9))){
                  return false;
                  }else{
                    return true;
                  }
                
              //  break;
      }
        case 6:{
          li_coeficientes  = Object.assign([], dig6_coeficientes);
          //li_coeficientes = dig6_coeficientes;
          li_dig_veri = parseInt(this.ruc.substr(dig_veri_6,1));
          // for(var coef of li_coeficientes){
          //     console.log(coef);
          // }
          break;
        }       
        case 9:{
          li_coeficientes  = Object.assign([], dig9_coeficientes);
          li_dig_veri = parseInt(this.ruc.substr(dig_veri_9,1));
        //   for(coef of li_coeficientes){
        //   console.log(coef);
        // }
          break;
        }     
   
  }}
  
  this.li_suma=0;
  
  var li_max = li_coeficientes.length;
  console.log(li_max);
  
  for(li_cont=0;li_cont<li_max;li_cont++){
      this.li_suma += parseInt(this.ruc.substr(li_cont,1)) * li_coeficientes[li_cont];
    console.log('suma' +' ' +this.li_suma);
  }
  var li_residuo = this.li_suma % modulo11;
  console.log('res' + ' ' +li_residuo);
  if(li_residuo == 1){
    return false;
  }
  if(li_residuo == 0){
    return true;
  }
  
  li_dig_res = modulo11 - li_residuo; 
  console.log(li_dig_res);
  console.log(li_dig_veri);
    
  if(li_dig_res == li_dig_veri){
    return true;
  
  }
  else{
    return false;
  }
  }
  
  digitoVerificador(cedula){
    var dig0_verificadorc:number[] = [2,1,2,1,2,1,2,1,2];
  
    this.li_valor=0;
    this.li_suma=0;
    this.lb_exito=false;
  
     if (parseInt(this.ruc.substr(0,2)) > 0) {
      console.log(parseInt(this.ruc.substr(0,2)));
        for (var li_cont=0; li_cont<9; li_cont++){
          console.log(parseInt(this.ruc.substr(li_cont,1)) +' '+ dig0_verificadorc[li_cont]);
           this.li_valor = parseInt(this.ruc.substr(li_cont,1)) * dig0_verificadorc[li_cont];
    console.log('li_valor' + ' ' + this.li_valor);
      if (this.li_valor > 9){
            this.li_valor = this.li_valor - 9;}
       this.li_suma += this.li_valor;
        console.log('li_suma' + ' '+ this.li_suma);
      }
    
    this.li_valor = (10 - (this.li_suma % 10))
    console.log('MOD' + ' '+ this.li_valor);
    if (this.li_valor == 10) {
        this.li_valor = 0}
        console.log(this.li_valor);
    if (this.li_valor == parseInt(this.ruc.substr(9,1))) {
        return true;
      }
        else{
          return false;
        }
     }
    
    }
  

  cargaDatosEmpresa(){
    this.storage.get('gempresa').then((val) => {
      let empr = val;
      let postDataEmpresa = '{ "codigo" : '+ empr + '}';
      this.provedor.obtenerDatosEmpresa(postDataEmpresa)
    .subscribe(data => {
    this.datosEmpresa = data;
    console.log(this.datosEmpresa);},
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
      console.log(this.datosUsuario);},
      err => {
      console.log(err);
      })
      });
    
    }

  obtenerCliente(ruc){
    if (this.validarDatosCI()){
    let postDataCliente = '{ "ruc" : "'+ ruc +'" }';
    this.provedor.obtenerDatosCliente(postDataCliente)
  .subscribe(data => {
    console.log(data);
    if(JSON.stringify(data)=="[]"){
      this.storage.set("gciruc",this.ruc);
      this.limpiarDatos();
      this.navCtrl.push(AddclientePage);
      }else{
     // console.log(JSON.stringify(data));
     this.limpiarDatos();
    this.clientes=data
    for (let cliente of this.clientes) {
    this.codigo = cliente.codigo;
    this.nombre = cliente.nombre.toUpperCase();
    this.apellido = cliente.apellido.toUpperCase();
    this.email = cliente.email;
    this.direccion = cliente.direccion.toUpperCase();;
    this.celular = cliente.celular;
    this.telefono = cliente.telefono;
    if (cliente.fechaNacimiento != null){
      this.fNacimiento = cliente.fechaNacimiento;
    }
    this.isenabled=true;
    console.log(this.nombre);
  }}},err => {
  console.log(err);})
}
}

limpiarDatos(){
  this.nombre='';
  this.apellido='';
  this.email='';
  this.direccion='';
  this.celular='';
  this.telefono='';
  this.fNacimiento='';
  // this.ruc='';
}

revisaPrefiere(){
  if(this.telefono.length == 0){
    this.prefiereTelefono = "P";
  }else{
    this.prefiereTelefono = "L"; 
  }
  if(this.celular.length == 0){
    this.prefiereCelular = "P";
  }else{
    this.prefiereCelular = "L"; 
  }
  if(this.email.length == 0){
    this.prefiereEmail = "P";
  }else{
    this.prefiereEmail = "L"; 
  }
  if(this.fNacimiento.length == 0){
    this.prefiereFechaNacimiemto = "P";
  }else{
    this.prefiereFechaNacimiemto = "L"; 
  }

}

actualizaCliente(){
  if(this.validarDatos()){
    this.revisaPrefiere();
  let postDataCliente = '{ "codigo" : "' + this.codigo + '", ' +
     ' "ruc" : "' + this.ruc + '", ' +
     ' "nombre" : "' + this.nombre.toUpperCase() + '", ' +
     ' "apellido" : "' + this.apellido.toUpperCase() + '", ' +
     ' "email" : "' + this.email + '", ' +
     ' "direccion" : "' + this.direccion.toUpperCase() + '", ' +
     ' "telefono" : "' + this.telefono + '", ' +
     ' "celular" : "' + this.celular + '", ' +
     ' "fechaNacimiento" : "' + this.fNacimiento + '", ' +
     ' "prefiereTelefono" : "' + this.prefiereTelefono + '", ' +
     ' "prefiereCelular" : "' + this.prefiereCelular + '", ' +
     ' "prefiereEmail" : "' + this.prefiereEmail + '", ' +
     ' "prefiereDiaMes" : "' + this.prefiereFechaNacimiemto + '", ' +
     ' "prefiereAnio" : "' + this.prefiereFechaNacimiemto + '"} '; 
        
     console.log(postDataCliente);

  this.provedor.actualizaCliente(postDataCliente) 
 .subscribe(result => {
   if(result){
      this.presentAlertValida("Exito!","Cliente ha sido Actualizado.");
      this.limpiarDatos();
      this.ruc='';
      this.isenabled=false;
   }
 
 },err => {
        console.log(err);
      }
 )
    }
}

presentAlertValida(titulo:string, subtitulo:string) {
 let alert = this.alertCtrl.create({
   title: titulo,
   subTitle: subtitulo,
   buttons: ['OK']
 });
 alert.present();
}

goAddCliente(){
  this.storage.set("gciruc",'');
  this.navCtrl.push(AddclientePage);
}



}
