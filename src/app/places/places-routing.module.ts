import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage
  },
  {
    path: 'place-datail',
    loadChildren: () => import('./place-datail/place-datail.module').then( m => m.PlaceDatailPageModule)
  },
  {
    path: 'create-place',
    loadChildren: () => import('./create-place/create-place.module').then( m => m.CreatePlacePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
