import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';
import { StockProductosPage } from '../../pages/stock-productos/stock-productos';
import { ActualizaClientePage } from '../../pages/actualiza-cliente/actualiza-cliente';
import { CargaDistribuidorPage } from '../../pages/carga-distribuidor/carga-distribuidor';
import { DatosMpPage } from "../../pages/datos-mp/datos-mp";
import { ControlIngePage } from "../../pages/control-inge/control-inge";
import { HabiDescuentoPage } from "../../pages/habi-descuento/habi-descuento";
import { DiasnotacreditoPage } from "../../pages/diasnotacredito/diasnotacredito";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the ModuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modulo',
  templateUrl: 'modulo.html',
})
export class ModuloPage {
  modulos;
  opciones;
  usuarios;
  user='';
  datos;
  codModu;
  datosEmpresa;
  datosUsuario;
  
    
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,
    public provedor: Proveedor1Provider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModuloPage');
    this.storage.get('gusuario').then((data) => {
      if(data != null)
      {
       console.log(data);
       this.datos = data;
       let postDataUsuario = '{ "usuario": "' + this.datos + '"}';
       this.provedor.obtenerDatosModulo(postDataUsuario)
      .subscribe(data => {
      this.modulos = data;
      console.log(data);
    },err => {
      console.log(err);
    })

      }
     });
      // for (let data  of this.datos ) {
      //     this.user = data.gusuario;
      //    }
     // console.log(this.postDataUsuario);
  this.cargaDatosEmpresa();
  this.cargaDatosUsuario();
  }

  goOpcion(pagina:String):void{
    // for (let modulo of this.modulos) {
    //    this.page = modulo.pagina;
    //   }
    console.log(pagina)
      if (pagina == "ActualizaClientePage"){
        this.navCtrl.push(ActualizaClientePage);        
      }
      else if(pagina == "StockProductosPage"){
        this.navCtrl.push(StockProductosPage);
      }
      else if(pagina == "CargaDistribuidorPage"){
        this.navCtrl.push(CargaDistribuidorPage);
      }
      else if(pagina == "DatosMpPage"){
        this.navCtrl.push(DatosMpPage);
      }
      else if(pagina == "HabiDescuentoPage"){
        this.navCtrl.push(HabiDescuentoPage);
      }
      else if(pagina == "ControlIngePage"){
        this.navCtrl.push(ControlIngePage);
      }
       else if(pagina == "DiasnotacreditoPage"){
        this.navCtrl.push(DiasnotacreditoPage);
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

cargaOpciones(codigomodulo){
  this.codModu=codigomodulo;
  this.storage.get('gusuario').then((data) => {
    if(data != null)
    {
    // console.log(data);
     this.datos = data;
     let postDataUsuario = '{ "usuario": "' + this.datos + '"}';
  this.provedor.obtenerDatosOpciones(postDataUsuario).subscribe(data => {
    this.opciones = data;
    console.log(data);},
    err => {
            console.log(err);
            })
          }
        })
      }
}
