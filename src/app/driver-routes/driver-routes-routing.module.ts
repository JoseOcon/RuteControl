import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverRoutesPage } from './driver-routes.page';

const routes: Routes = [
  {
    path: '',
    component: DriverRoutesPage
  },
  {
    path: 'travel-details',
    loadChildren: () => import('./travel-details/travel-details.module').then( m => m.TravelDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutesPageRoutingModule {}
