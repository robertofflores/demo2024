import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";
import { AlertController } from "ionic-angular";
import { ActualizaClientePage } from "../../pages/actualiza-cliente/actualiza-cliente";


@Component({
  selector: 'page-addcliente',
  templateUrl: 'addcliente.html'
})
export class AddclientePage {
  cedula='';
  nombres='';
  apellidos='';
  email='';
  direccion='';
  telefono='';
  celular='';
  fNacimiento='';
  cis;
  msjCedula='';
  msjNombres='';
  msjApellidos='';
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
  showCedula:boolean=false;
  showNombres:boolean=false;
  showApellidos:boolean=false;
  showEmail:boolean=false;
  showDireccion:boolean=false;
  showCelular:boolean=false;
  showTelefono:boolean=false;
  showFNacimiento:boolean=false;
  li_valor:number=0;
  li_suma:number=0;
  lb_exito:boolean=false;
  datosEmpresa;
  datosUsuario;
  datosFecha;
  
  constructor(public navCtrl: NavController, private storage: Storage, private provedor:Proveedor1Provider,
    private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
   this.cargaRUC();
  this.cargaDatosEmpresa();
  this.cargaDatosUsuario();
  this.obtenerFecha();
  }

  // otherClear(){
  //    const actualizar = new ActualizaClientePage;
    
  // }

  cargaDatosEmpresa(){
    this.storage.get('gempresa').then((val) => {
      let empr = val;
      let postDataEmpresa = '{ "codigo" : '+ empr + '}';
      this.provedor.obtenerDatosEmpresa(postDataEmpresa)
    .subscribe(data => {
      console.log(data);
    this.datosEmpresa = data;
  },
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
        console.log(data);
      this.datosUsuario = data;
      },
      err => {
      console.log(err);
      })
      });
    
    }
  
cargaRUC(){
  this.storage.get('gciruc').then((data) => {
    console.log(data);
     this.cedula = data;
})
}

obtenerFecha(){
  this.provedor.obtenerFecha().subscribe(data => {
      console.log("Fecha" + data);
    this.datosFecha = data;
  
    for (let datoF of this.datosFecha) {
           this.fechaActual = datoF.fechaActual;
         }
  },
    err => {
            console.log(err);
            })
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

creaCliente(){
  if(this.validarDatos()){
    this.revisaPrefiere();
  let postDataCliente = '{ "ruc" : "' + this.cedula + '", ' +
     ' "nombre" : "' + this.nombres.toUpperCase() + '", ' +
     ' "apellido" : "' + this.apellidos.toUpperCase() + '", ' +
     ' "email" : "' + this.email + '", ' +
     ' "direccion" : "' + this.direccion.toUpperCase() + '", ' +
     ' "telefono" : "' + this.telefono + '", ' +
     ' "celular" : "' + this.celular + '", ' +
     ' "fechaNacimiento" : "' + this.fNacimiento + '", ' +
     ' "fechaCrea" : "' + this.fechaActual + '", ' +
     ' "prefiereTelefono" : "' + this.prefiereTelefono + '", ' +
     ' "prefiereCelular" : "' + this.prefiereCelular + '", ' +
     ' "prefiereEmail" : "' + this.prefiereEmail + '", ' +
     ' "prefiereDiaMes" : "' + this.prefiereFechaNacimiemto + '", ' +
     ' "prefiereAnio" : "' + this.prefiereFechaNacimiemto + '"} '; 
     console.log(postDataCliente);
  this.provedor.creaCliente(postDataCliente) 
 .subscribe(result => {
   if(result){
      this.presentAlertValida("Exito!","Cliente ha sido Creado.");
      this.nombres='';
      this.apellidos='';
      this.email='';
      this.direccion='';
      this.celular='';
      this.telefono='';
      this.fNacimiento='';
      this.cedula='';
      this.navCtrl.push(ActualizaClientePage);  
    }
  },err => {
        console.log(err);
      })
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

validaRuc(ruc){
  var dig9_coeficientes:number[] = [4,3,2,7,6,5,4,3,2];
  var dig6_coeficientes:number[] = [3,2,7,6,5,4,3,2];
   var li_coeficientes:number[];
    const modulo11:number = 11;
    const dig_veri_6:number = 8;
    const dig_veri_9:number = 9;
 

    
var li_dig_3,li_cont,li_dig_veri,li_dig_res:number=0;

li_dig_3 = parseInt(this.cedula.substr(2,1));

if (li_dig_3 != 7 && li_dig_3 != 8 && parseInt(this.cedula.substr(0,2)) > 0 &&  parseInt(this.cedula.substr(10,3))>0){ 


switch (li_dig_3) {
  case 0:{
    if (!this.digitoVerificador(this.cedula.substr(0,9))){
      return false;
      }else{
        return true;
      }
    
    // break;
  }
    case 1:{
      if (!this.digitoVerificador(this.cedula.substr(0,9))){
        return false;
        }else{
          return true;
        }
      // break;
      }
    case 2:{
        if (!this.digitoVerificador(this.cedula.substr(0,9))){
          return false;
          }else{
            return true;
          }
      //  break;
    }
    case 3:{
          if (!this.digitoVerificador(this.cedula.substr(0,9))){
            return false;
            }else{
              return true;
            }
       //     break;
          }
    case 4:{
            if (!this.digitoVerificador(this.cedula.substr(0,9))){
              return false;
              }else{
                return true;
              }
        //    break;
      } 
    case 5:{
              if (!this.digitoVerificador(this.cedula.substr(0,9))){
                return false;
                }else{
                  return true;
                }
              
            //  break;
    }
      case 6:{
        li_coeficientes  = Object.assign([], dig6_coeficientes);
        //li_coeficientes = dig6_coeficientes;
        li_dig_veri = parseInt(this.cedula.substr(dig_veri_6,1));
        // for(var coef of li_coeficientes){
        //     console.log(coef);
        // }
        break;
      }       
      case 9:{
        li_coeficientes  = Object.assign([], dig9_coeficientes);
        li_dig_veri = parseInt(this.cedula.substr(dig_veri_9,1));
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
    this.li_suma += parseInt(this.cedula.substr(li_cont,1)) * li_coeficientes[li_cont];
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

   if (parseInt(this.cedula.substr(0,2)) > 0) {
    console.log(parseInt(this.cedula.substr(0,2)));
      for (var li_cont=0; li_cont<9; li_cont++){
        console.log(parseInt(this.cedula.substr(li_cont,1)) +' '+ dig0_verificadorc[li_cont]);
         this.li_valor = parseInt(this.cedula.substr(li_cont,1)) * dig0_verificadorc[li_cont];
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
	if (this.li_valor == parseInt(this.cedula.substr(9,1))) {
      return true;
    }
      else{
        return false;
      }
   }
  
  }


validarDatos(){
  if (this.cedula.length == 0){
    this.showCedula=true;
    this.msjCedula='* Campo requerido.';
    return;
  }else{
  this.showCedula=false;
  }
  if (this.cedula.length > 0 && this.cedula.length != 10 && this.cedula.length != 13){
    this.showCedula=true;
    this.msjCedula='* Longitud 10 ó 13';
    return;
  }else{
    this.showCedula=false;
  }

if (this.cedula.length > 0){
    for (var i=0; i<this.cedula.length; i++ ){
      if (isNaN(parseInt(this.cedula.substr(i,1)))){
      this.showCedula=true;
      this.msjCedula='* Campo sólo admite números.';
      return;
    }
    else{
      this.showCedula=false;
    }}}
  

  if (this.cedula.length == 10){
      if (!this.digitoVerificador(this.cedula)){
          this.showCedula=true;
          this.msjCedula='* Número de Cédula Inválido.';
          return;
      }else{
          this.showCedula=false;
  }
}


  if(this.cedula.length == 13){
if(!this.validaRuc(this.cedula)){
  this.showCedula=true;
  this.msjCedula='* Número de RUC Inválido.';
  return;
}else{
  this.showCedula=false;
}
 
}
   if (this.nombres.length == 0){
    this.showNombres=true;
    this.msjNombres='* Campo requerido.';
    return;
  }else{
  this.showNombres=false;
  }

  if (this.nombres.length > 0){
    var re = /^[a-zA-ZñÑ ]{3,50}$/;
   if(!re.test(String(this.nombres))){
    this.showNombres=true;
    this.msjNombres='* Campo sólo admite Letras y espacios. Longitud 3 a 50.';
    return;
  }else{
  this.showNombres=false;
   }
  }

  if (this.apellidos.length == 0){
    this.showApellidos=true;
    this.msjApellidos='* Campo requerido.';
    return;
  }else{
  this.showApellidos=false;
  }

  if (this.apellidos.length > 0){
    re = /^[a-zA-ZñÑ ]{3,50}$/;
   if(!re.test(String(this.apellidos))){
    this.showApellidos=true;
    this.msjApellidos='* Campo sólo admite Letras y espacios. Longitud 3 a 50.';
    return;
  }else{
  this.showApellidos=false;
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
  for (i=0; i<this.celular.length; i++ ){
  
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

}


