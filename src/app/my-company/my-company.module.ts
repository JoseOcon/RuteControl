import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCompanyPageRoutingModule } from './my-company-routing.module';

import { MyCompanyPage } from './my-company.page';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCompanyPageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [MyCompanyPage]
})
export class MyCompanyPageModule {}
