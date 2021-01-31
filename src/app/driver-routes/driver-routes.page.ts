import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.page.html',
  styleUrls: ['./driver-routes.page.scss'],
})
export class DriverRoutesPage implements OnInit {


  routes = [
    {
      id: "1",
      nombre: "First route",
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg",
      comments: ["Awesome place", "Wonderful experience"]
    },
    {
      id: "2",
      nombre: "Second route",
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg",
      comments: ["Awesome place", "Wonderful experience"]
    },
  ];

  filterValue = '';

  constructor(
    private _globalService: GlobalService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSearchChange(event){
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


  createTravel(){
    this.router.navigate(['/driver-routes', 1])
  }
}
