import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global/global.service";
import { RoutesService } from "../routes/routes.service";
import { TravelsService } from "./travels.service";

@Component({
  selector: "app-travels",
  templateUrl: "./travels.page.html",
  styleUrls: ["./travels.page.scss"],
})
export class TravelsPage implements OnInit {
  routes = [];
  travels = [];

  routeSelected = null;
  filterValue = "";
  loading: boolean = true;

  constructor(
    private _globalService: GlobalService,
    public _routesService: RoutesService,
    public _travelsService: TravelsService
  ) {}

  async ngOnInit() {
    await this._routesService
      .getRoutes()
      .toPromise()
      .then((data: any) => {
        this.routes = data.routes;
        if (this.routes.length != 0) {
          this.routeSelected = this.routes[0].id;
          this.routeChanged();
        }
      });
  }

  routeChanged() {
    this.loading = true;
    this._travelsService.getTravels(this.routeSelected).subscribe({
      next: (data: any) => {
        this.travels = data.travels;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`Error: ${err.message}`);
      },
    });
  }

  onSearchChange(event) {
    const filter = event.target.value;
    this.filterValue = filter;
  }

  showInfo() {
    this._globalService.showMessage(
      "Seleccione una ruta para mostrar todos sus viajes realizados, para ver cada viaje a detalle presiones sobre le mismo.",
      2500
    );
  }
}
