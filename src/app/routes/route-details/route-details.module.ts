import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteDetailsPageRoutingModule } from './route-details-routing.module';

import { RouteDetailsPage } from './route-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteDetailsPageRoutingModule
  ],
  declarations: [RouteDetailsPage]
})
export class RouteDetailsPageModule {}
