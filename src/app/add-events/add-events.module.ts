import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEventsPageRoutingModule } from './add-events-routing.module';

import { AddEventsPage } from './add-events.page';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEventsPageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [AddEventsPage]
})
export class AddEventsPageModule {}
