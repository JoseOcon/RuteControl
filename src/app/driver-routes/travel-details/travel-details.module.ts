import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDetailsPageRoutingModule } from './travel-details-routing.module';

import { TravelDetailsPage } from './travel-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { AddEventsPage } from 'src/app/add-events/add-events.page';
import { AddEventsPageModule } from 'src/app/add-events/add-events.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDetailsPageRoutingModule,
    ComponentsModule,
    SharedModule,
    AddEventsPageModule
  ],
  declarations: [TravelDetailsPage],
  entryComponents: [AddEventsPage]
})
export class TravelDetailsPageModule {}
