import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverRoutesPage } from './driver-routes.page';

const routes: Routes = [
  {
    path: '',
    component: DriverRoutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutesPageRoutingModule {}
