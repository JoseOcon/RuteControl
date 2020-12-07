import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceDatailPage } from './place-datail.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceDatailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceDatailPageRoutingModule {}
