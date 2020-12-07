import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDatailPageRoutingModule } from './place-datail-routing.module';

import { PlaceDatailPage } from './place-datail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDatailPageRoutingModule
  ],
  declarations: [PlaceDatailPage]
})
export class PlaceDatailPageModule {}
