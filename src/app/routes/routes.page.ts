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


  filterValue = '';
  subscription: Subscription;
  loading: boolean = true;

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
        this._routesService.routes = data.routes;
        this.loading = false;
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
