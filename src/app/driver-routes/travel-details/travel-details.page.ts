import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController, ModalController } from '@ionic/angular';
import { AddEventsPage } from 'src/app/add-events/add-events.page';
import { GlobalService } from 'src/app/global/global.service';
import { RoutesService } from 'src/app/routes/routes.service';
import { TravelsService } from 'src/app/travels/travels.service';

declare var google;

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
})
export class TravelDetailsPage implements OnInit {

  travelId: number;
  route: any = null;

  mapElem: HTMLElement = null;
  indicatorsEle: HTMLElement = null;

  myMap = null;
  myLatLng = null;
  loading = null;
  showInfo: boolean = false;
  travel: any = {
    fecha: null,
  };

  markers: Array<any> = [];
  wayPoints: Array<any> = [];
  intialPoint = null;
  finalPoint = null;
  currentPositionM = null;

  users: Array<any> = [];

  events: Array<any> = [];

  icon = {
    url: "../../../assets/imgs/car-icon.png",
    scaledSize: new google.maps.Size(50, 60),
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private _travelService: TravelsService,
    private _routeService: RoutesService,
    private _globalService: GlobalService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.startPage()
  }

  async startPage(){
    this.loading = await this.loadCtrl.create();
    this.loading.present();

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.travelId = +paramMap.get("travelId");
    });

    await this._travelService
      .getTravel(this.travelId)
      .toPromise()
      .then((data: any) => {
        this.travel = data.travel[0];
      });

    this.getRoutePoints();
    this.getTravelUsers();
  }

  async getRoutePoints() {

    this.markers = [];

    await this._routeService
      .getRoute(this.travel.id_Ruta)
      .toPromise()
      .then((data: any) => {
        this.route = data.routes[0];
      });

    let position = {
      lat: this.route.punto_Origen_LAT,
      lng: this.route.punto_Origen_LNG,
    };
    this.markers.push(position);

    await this.getStops();

    let position2 = {
      lat: this.route.punto_Destino_LAT,
      lng: this.route.punto_Destino_LNG,
    };
    this.markers.push(position2);

    this.loadMap();
  }

  async getStops() {
    await this._routeService
      .getStops(this.route.id)
      .toPromise()
      .then((data: any) => {
        data.stops.forEach((element) => {
          let position = {
            lat: element.LAT,
            lng: element.LNG,
          };
          this.markers.push(position);
        });
      });
  }

  async loadMap() {
    await this.getLocation();
    this.createMap();
    this.addMapEvents();
  }

  async getLocation() {
    const rute = await this.geolocation.getCurrentPosition();
    this.myLatLng = {
      lat: rute.coords.latitude,
      lng: rute.coords.longitude,
    };
  }

  createMap() {
    this.mapElem = document.getElementById("map");
    this.indicatorsEle = document.getElementById("indicators");
    this.myMap = new google.maps.Map(this.mapElem, {
      center: this.myLatLng,
      zoom: 10,
    });
    this.directionsDisplay.setMap(this.myMap);
    this.directionsDisplay.setPanel(this.indicatorsEle);
  }

  addMapEvents() {
    google.maps.event.addListenerOnce(this.myMap, "idle", () => {
      this.loading.dismiss();
      this.mapElem.classList.add("show-map");
      this.calculateRute();
      this.setCurrentPosition();
    });
  }

  async calculateRute() {
    if (this.markers.length > 2) {
      let maxIndex = this.markers.length - 1;
      this.wayPoints = await this.getWayPoints();
      this.directionsService.route(
        {
          origin: this.markers[0],
          destination: this.markers[maxIndex],
          waypoints: this.wayPoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
          } else {
            alert("¡No existe ruta entre los puntos!" + status);
          }
        }
      );
    } else {
      this.directionsDisplay.setDirections({ routes: [] });
    }
  }

  getWayPoints() {
    let wayPoints = [];

    this.intialPoint = {
      location: {
        lat: this.markers[0].lat,
        lng: this.markers[0].lng,
      },
    };

    for (let i = 0; i < this.markers.length; i++) {
      if (i > 0 && i < this.markers.length - 1) {
        wayPoints.push({
          location: {
            lat: this.markers[i].lat,
            lng: this.markers[i].lng,
          },
          stopover: true,
        });
      } else if (i == this.markers.length - 1) {
        this.finalPoint = {
          location: {
            lat: this.markers[i].lat,
            lng: this.markers[i].lng,
          },
        };
      }
    }
    return wayPoints;
  }

  getTravelUsers() {
    this._travelService.getTravelUsers(this.travelId).subscribe(
      (data: any) => {
        this.users = data.users;
      }
    )
  }

  showHelp() {
    this._globalService.showMessage(
      "Para actualizar la posición del auto en ruta y los usuarios que se han subido al auto presione el boton" +
      " \"Actualizar\". Si ya ha finalizado el viaje presione el boton finalizar, una vez hecho esto no se" + 
      " podrá modificar más el estado del viaje. Por último, para crear un evento presione el segundo botón" + 
      " con el icono de megáfono.",
      9000
    );
  }

  setCurrentPosition(){
    this.getLocation()
    this.currentPositionM = new google.maps.Marker({
      position: {
        lat: this.myLatLng.lat,
        lng: this.myLatLng.lng
      },
      map: this.myMap,
      icon: this.icon
    });
  }

  async addEvent(){
    const modal = await this.modalCtrl.create({
      component: AddEventsPage,
      componentProps: {
        myEvent: null,
        onlyShowInfo:false,
        travelId: this.travelId
      }
    })

    await modal.present();
  }

  userAsistence(event, userId){

    let json = {
      idViaje: this.travelId,
      idUsuario: userId,
      isActive: event.detail.checked? 1 : 0
    }

    this._travelService.updateTravelUserState(json).subscribe({
      next: (data: any) => {
        if(data.status == 200){
          this._globalService.showMessage("¡Se ha actualizado el estado del usuario!")
        }else{
          this._globalService.showMessage("¡Ha ocurrido un error al intentar acutalizar el estado del usuario!")
        }
      }, error: (err: HttpErrorResponse) => this._globalService.showMessage(`Error: ${err.message}`)
    })
  }

  updateStatus() {
    this.currentPositionM.setMap(null);
    this.currentPositionM = null;
    this.startPage()
  }

  finishTravel(){
    this.router.navigate(['/driver-routes'])
  }
}
