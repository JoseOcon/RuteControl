import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDetailsPageRoutingModule } from './travel-details-routing.module';

import { TravelDetailsPage } from './travel-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDetailsPageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [TravelDetailsPage]
})
export class TravelDetailsPageModule {}
