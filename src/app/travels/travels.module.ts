import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelsPageRoutingModule } from './travels-routing.module';

import { TravelsPage } from './travels.page';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelsPageRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  declarations: [TravelsPage]
})
export class TravelsPageModule {}
