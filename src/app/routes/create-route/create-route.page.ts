import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Marker } from "src/app/interfaces/marker";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

declare var google;

@Component({
  selector: "app-create-route",
  templateUrl: "./create-route.page.html",
  styleUrls: ["./create-route.page.scss"],
})
export class CreateRoutePage implements OnInit {
  mapElem: HTMLElement = null;
  indicatorsEle: HTMLElement = null;
  myMap = null;
  myLatLng = null;
  loading = null;
  showInfo: boolean = false;

  markers: Array<any> = [];

  icon = {
    url: "../../../assets/imgs/car-icon.png",
    scaledSize: new google.maps.Size(50, 60),
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController
  ) {}

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

      //Adding click event to add a marker
      google.maps.event.addListener(this.myMap, "click", (mapsMouseEvent) => {
        let cstmLatLg = mapsMouseEvent.latLng.toJSON();
        let position = {
          lat: cstmLatLg.lat,
          lng: cstmLatLg.lng,
        };
        this.addMarker(position);
      });
    });
  }

  addMarker(position) {
    let myMarker = new google.maps.Marker({
      position: position,
      map: this.myMap,
      icon: this.icon,
    });

    //Delete event
    myMarker.addListener("click", () => {
      this.markers = this.markers.filter(
        (elem) =>
          elem.position.toJSON().lat != myMarker.position.toJSON().lat &&
          elem.position.toJSON().lng != myMarker.position.toJSON().lng
      );
      myMarker.setMap(null);
      this.calculateRute();
    });

    this.markers.push(myMarker);
    this.calculateRute();
  }

  async calculateRute() {
    if (this.markers.length > 2) {

      let maxIndex = this.markers.length - 1;
      let wayPoints = await this.getWayPoints();
      this.directionsService.route(
        {
          origin: this.markers[0].position.toJSON(),
          destination: this.markers[maxIndex].position.toJSON(),
          waypoints: wayPoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
          } else {
            alert("Could not display directions due to: " + status);
          }
        }
      );
    }
  }

  getWayPoints() {
    let wayPoints = [];

    for (let i = 0; i < this.markers.length; i++) {
      if (i > 0 && i < this.markers.length - 1) {
        wayPoints.push({
          location: {
            lat: this.markers[i].position.toJSON().lat,
            lng: this.markers[i].position.toJSON().lng,
          },
          stopover: true,
        });
      }
    }
    return wayPoints;
  }
}
