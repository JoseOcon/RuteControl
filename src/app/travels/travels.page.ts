import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {

  routes = [
    {
      id: "1",
      nombre: "First route",
    },
    {
      id: "2",
      nombre: "Second route",
    },
  ];

  travels = [
    {
      id: 1,
      date: "12/05/2020"
    }
  ];
  routeSelected = null;
  filterValue = '';

  constructor(
    private _globalService: GlobalService
  ) { }

  ngOnInit() {
  }

  onSearchChange(event){
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
