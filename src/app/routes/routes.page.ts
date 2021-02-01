import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { RoutesService } from './routes.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {


  routes = [];

  filterValue = '';
  subscription: Subscription;

  constructor(
    public _routesService: RoutesService,
    public _globalService: GlobalService
  ) { }

  ngOnInit() {
    this.getRoutes()
  }

  getRoutes(){
    this.subscription = this._routesService.getRoutes().subscribe({
      next: (data: any) => {
        console.log(data)
        this.routes = data.routes;
        this.subscription.unsubscribe()
      }, error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`Error: ${err.message}`);
      }
    })
  }

  onSearchChange(event){
    const filter = event.target.value;
    this.filterValue = filter;
  }
}
