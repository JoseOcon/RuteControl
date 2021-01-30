import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteDetailsPageRoutingModule } from './route-details-routing.module';

import { RouteDetailsPage } from './route-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteDetailsPageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [RouteDetailsPage]
})
export class RouteDetailsPageModule {}
