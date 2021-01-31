import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCompanyPage } from './my-company.page';

const routes: Routes = [
  {
    path: '',
    component: MyCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCompanyPageRoutingModule {}
