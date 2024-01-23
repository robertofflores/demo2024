import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'


/*
  Generated class for the Proveedor1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Proveedor1Provider {
  basepath = "/clienteapi";
  basepathUsuario = "/usuarioapi";
  urlapi = "/urlapi";



  constructor(
    public http: HttpClient,
     private _platform: Platform
    ) {
   if(this._platform.is("cordova")) {
      //this.basepath = "http://localhost:8100";
       //this.urlapi="http://192.168.2.7:8089";  //Publicado en 192.168.2.7
      //this.urlapi="http://localhost:8080";  //Publicado en 192.168.2.7
      // this.urlapi="http://200.7.208.131:8080"; //Construido IP Pública

    }
    else{
     this.urlapi="http://200.7.208.131:8080"; //Construido IP Pública
    // this.urlapi="http://localhost:8089";

    }

  }


  obtenerDatos(){
     return this.http.get(`${this.basepath}/api/Cliente`);
    }

    // enviarDatos(postData){cd
    //   return this.http.post(`${this.basepath}/api/Cliente`,JSON.parse(postData));
    //  }

    eliminarDatos(id){
      return this.http.delete(`${this.basepath}/api/Cliente/` + id);
     }

    obtenerDatosUsuario(){
      return this.http.get(`${this.basepathUsuario}/ApiRest/services/JavaMobil/obtenerUsuario`);
     }

     validarDatosLoggin(postDataLoggin){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/validarUsuario`,JSON.parse(postDataLoggin));
     }

     validarLoggin(postDataLoggin){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/validarLoggin`,JSON.parse(postDataLoggin));
     }

     obtenerDatosModulo(postDataUsuario){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerModulo`,JSON.parse(postDataUsuario));
     }

     obtenerDatosOpciones(postDataUsuario){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerOpciones`,JSON.parse(postDataUsuario));
     }

    obtenerStock(postDataProducto){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerStock`,JSON.parse(postDataProducto));
     }

     obtenerDconti(postDataDconti){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/detalleConti`,JSON.parse(postDataDconti));
     }

     obtenerCinope(postDataCinope){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerCinope`,JSON.parse(postDataCinope));
     }

     obtenerSucu(){
      return this.http.get(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerSucursal`);
     }

     obtenerFecha(){
      return this.http.get(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerFecha`);
     }

     obtenerCodProd(){
      return this.http.get(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerCodProd`);
     }

     obtenerNomProd(postDataProducto){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerNomProd`,JSON.parse(postDataProducto));
     }

     enviarDatosUsuario(postDataUsuario){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/registraUsuario`,JSON.parse(postDataUsuario));
     }

     obtenerDatosCliente(postDataCliente){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerClientes`,JSON.parse(postDataCliente));
     }

     actualizaCliente(postDataCliente){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/actualizaCliente`,JSON.parse(postDataCliente));
     }

     creaCliente(postDataCliente){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/creaCliente`,JSON.parse(postDataCliente));
     }

     obtenerDatosMP(postDataMP){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerMP`,JSON.parse(postDataMP));
     }

     obtenerCCosto(postDataUsua){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerCcosto`,JSON.parse(postDataUsua));
     }

     obtenerDatosEmpresa(postDataEmpresa){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerEmpresa`,JSON.parse(postDataEmpresa));
     }

     obtenerDatosUsuarioMbl(postDataUsuario){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/obtenerUsuarioMbl`,JSON.parse(postDataUsuario));
     }

     recibirMP(postDataMP){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/recibirMP`,JSON.parse(postDataMP));
     }

     recibirTodoMP(postDataMP){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/recibirTodoMP`,JSON.parse(postDataMP));
     }


     cambiarEstado(postCambiar){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/cambiarEstado`,JSON.parse(postCambiar));
     }

     actualizarNumDias(postActualizarDiasNC){
      return this.http.post(`${this.urlapi}/ApiRest/services/JavaMobil/actualizarDias`,JSON.parse(postActualizarDiasNC));
     }

    // enviarDatosUsuario(postData){
    //   return this.http.post(`${this.basepathUsuario}/ApiRest/services/JavaMobil/obtenerUsuario`,JSON.parse(postData));
    //   }

    // eliminarDatosUsuario(id){
    //    return this.http.delete(`${this.basepathUsuario}/api/Cliente/` + id);
    //   }

}
