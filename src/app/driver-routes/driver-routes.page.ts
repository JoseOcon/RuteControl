import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { GlobalService } from "../global/global.service";
import { RoutesService } from "../routes/routes.service";
import { TravelsService } from "../travels/travels.service";

@Component({
  selector: "app-driver-routes",
  templateUrl: "./driver-routes.page.html",
  styleUrls: ["./driver-routes.page.scss"],
})
export class DriverRoutesPage implements OnInit {
  routes = [];
  loadingC = null;
  filterValue = "";
  loading: boolean = true;

  constructor(
    private _globalService: GlobalService,
    private router: Router,
    private _routesService: RoutesService,
    private _travelService: TravelsService,
    private loadCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this._routesService.getRoutes().subscribe({
      next: (data: any) => {
        this.routes = data.routes;
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

  showHelp() {
    this._globalService.showMessage(
      "Al presionar sobre la ruta esto creará inmediatamente un nuevo viaje, lo cual lo llevará a una nueva" +
        " vista en donde verá el listado de todos los usuario pertenecientes a dicha ruta además de la ruta en sí.",
      4500
    );
  }

  async createTravel(routeId: number) {
    this.loadingC = await this.loadCtrl.create();
    this.loadingC.present();
    this._travelService.createTravel(routeId).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.router.navigate(["/driver-routes", data.body.id]);
          this.loadingC.dismiss();
        } else {
          this._globalService.showMessage(
            "¡Ocurrió un error al intentar crear el viaje!"
          );
          this.loadingC.dismiss();
        }
      },
      error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`Error: ${err.message}`),
        this.loadingC.dismiss();
      }
    });
  }
}
