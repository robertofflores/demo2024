import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Proveedor1Provider } from '../providers/proveedor1/proveedor1';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule} from 'ng2-lazyload-image';
import { ClientePageModule } from '../pages/cliente/cliente.module';
import { UsuarioPageModule } from '../pages/usuario/usuario.module';
import { ModuloPageModule } from '../pages/modulo/modulo.module';
import { AddusuarioPageModule } from '../pages/addusuario/addusuario.module';
import { StockProductosPageModule } from '../pages/stock-productos/stock-productos.module';
import { ActualizaClientePageModule } from '../pages/actualiza-cliente/actualiza-cliente.module';
import { CargaDistribuidorPageModule } from '../pages/carga-distribuidor/carga-distribuidor.module';
import { IonicStorageModule } from "@ionic/storage";
import { DatosMpPageModule } from "../pages/datos-mp/datos-mp.module";
import { HabiDescuentoPageModule } from "../pages/habi-descuento/habi-descuento.module";
import { ControlIngePageModule } from "../pages/control-inge/control-inge.module";
import { DetalleContiPageModule } from "../pages/detalle-conti/detalle-conti.module";
import { DetalleCinopePageModule } from "../pages/detalle-cinope/detalle-cinope.module";
import { NuevoCinopePageModule } from "../pages/nuevo-cinope/nuevo-cinope.module";
import { AddclientePageModule } from "../pages/addcliente/addcliente.module";
import { DiasnotacreditoPageModule } from "../pages/diasnotacredito/diasnotacredito.module";
import { CustomFormsModule } from "ng2-validation";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LazyLoadImageModule,
    ClientePageModule,
    UsuarioPageModule,
    ModuloPageModule,
    AddusuarioPageModule,
    HabiDescuentoPageModule,
    StockProductosPageModule,
    ActualizaClientePageModule,
    CargaDistribuidorPageModule,
    DatosMpPageModule,
    ControlIngePageModule,
    DetalleContiPageModule,
    FileUploadModule,
    DetalleCinopePageModule,
    NuevoCinopePageModule,
    AddclientePageModule,
    DiasnotacreditoPageModule,
    FormsModule,
    CustomFormsModule,
    IonicStorageModule.forRoot()       
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
   providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Proveedor1Provider  
   
   ]
})

export class AppModule {}
