import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteDetailsPage } from './route-details.page';

const routes: Routes = [
  {
    path: '',
    component: RouteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteDetailsPageRoutingModule {}
