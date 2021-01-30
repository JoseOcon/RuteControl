import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesPageRoutingModule } from './routes-routing.module';

import { RoutesPage } from './routes.page';
import { ComponentsModule } from '../components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesPageRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  declarations: [RoutesPage],
  providers: [Geolocation]
})
export class RoutesPageModule {}
