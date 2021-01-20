import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesPage } from './routes.page';

const routes: Routes = [
  {
    path: '',
    component: RoutesPage
  },
  {
    path: 'route-details',
    loadChildren: () => import('./route-details/route-details.module').then( m => m.RouteDetailsPageModule)
  },
  {
    path: 'create-route',
    loadChildren: () => import('./create-route/create-route.module').then( m => m.CreateRoutePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}
