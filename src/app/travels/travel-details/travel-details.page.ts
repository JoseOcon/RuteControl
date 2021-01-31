import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
})
export class TravelDetailsPage implements OnInit {

  mapElem: HTMLElement = null;
  indicatorsEle: HTMLElement = null;

  myMap = null;
  myLatLng = null;
  loading = null;
  showInfo: boolean = false;
  travelDate = null;

  markers: Array<any> = [];
  wayPoints: Array<any> = [];
  intialPoint = null;
  finalPoint = null;
  currentPositionM =  null;

  users: Array<any> = [
    {
      id: 1,
      nombre: "Usuario 1"
    },
    {
      id: 2,
      nombre: "Usuario 2"
    },
  ];

  icon = {
    url: "../../../assets/imgs/car-icon.png",
    scaledSize: new google.maps.Size(50, 60),
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    this.loading = await this.loadCtrl.create();
    this.loading.present();

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
      this.setCurrentPosition();
      this.setAllMarkers();
    });
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

  setAllMarkers(){
    for(let i=0; i<this.markers.length; i++){
      new google.maps.Marker({
        position: {
          lat: this.markers[i].lat,
          lng: this.markers[i].lng,
        },
        map: this.myMap,
      });
    }
    this.calculateRute();
  }


  async calculateRute() {
    if (this.markers.length > 2) {
      let maxIndex = this.markers.length - 1;
      this.wayPoints = await this.getWayPoints();
      this.directionsService.route(
        {
          origin: this.markers[0].position.toJSON(),
          destination: this.markers[maxIndex].position.toJSON(),
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
        lat: this.markers[0].position.toJSON().lat,
        lng: this.markers[0].position.toJSON().lng,
      },
    };

    for (let i = 0; i < this.markers.length; i++) {
      if (i > 0 && i < this.markers.length - 1) {
        wayPoints.push({
          location: {
            lat: this.markers[i].position.toJSON().lat,
            lng: this.markers[i].position.toJSON().lng,
          },
          stopover: true,
        });
      } else if (i == this.markers.length - 1) {
        this.finalPoint = {
          location: {
            lat: this.markers[i].position.toJSON().lat,
            lng: this.markers[i].position.toJSON().lng,
          },
        };
      }
    }
    return wayPoints;
  }
}