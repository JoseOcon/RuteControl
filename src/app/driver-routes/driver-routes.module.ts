import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverRoutesPageRoutingModule } from './driver-routes-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { DriverRoutesPage } from './driver-routes.page';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverRoutesPageRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  declarations: [DriverRoutesPage],
  providers: [Geolocation]
})
export class DriverRoutesPageModule {}
