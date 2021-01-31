import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelDetailsPage } from './travel-details.page';

const routes: Routes = [
  {
    path: '',
    component: TravelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelDetailsPageRoutingModule {}
