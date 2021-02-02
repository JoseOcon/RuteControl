import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController, ModalController } from "@ionic/angular";
import { AddEventsPage } from "src/app/add-events/add-events.page";
import { RoutesService } from "src/app/routes/routes.service";
import { TravelsService } from "../travels.service";

declare var google;

@Component({
  selector: "app-travel-details",
  templateUrl: "./travel-details.page.html",
  styleUrls: ["./travel-details.page.scss"],
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
    private _routeService: RoutesService
  ) {}

  async ngOnInit() {
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
    this.getTravelEvents();
  }

  async getRoutePoints() {
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

  getTravelEvents(){
    this._travelService.getTravelEvents(this.travelId).subscribe(
      (data: any) => {
        this.events = data.events;
      }
    )
  }

  async showEventInfo(event, myEvent) {
    const modal = await this.modalCtrl.create({
      component: AddEventsPage,
      componentProps: {
        myEvent: myEvent,
        onlyShowInfo: true,
        travelId: null
      },
    });

    await modal.present();
  }
}
