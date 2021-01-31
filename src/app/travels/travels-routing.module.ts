import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelsPage } from './travels.page';

const routes: Routes = [
  {
    path: '',
    component: TravelsPage
  },
  {
    path: ':travelId',
    loadChildren: () => import('./travel-details/travel-details.module').then( m => m.TravelDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelsPageRoutingModule {}
