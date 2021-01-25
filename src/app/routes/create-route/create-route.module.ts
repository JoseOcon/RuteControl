import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRoutePageRoutingModule } from './create-route-routing.module';

import { CreateRoutePage } from './create-route.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRoutePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateRoutePage]
})
export class CreateRoutePageModule {}
