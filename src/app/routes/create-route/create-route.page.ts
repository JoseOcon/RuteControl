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
  myMap = null;
  myLatLng = null;
  loading = null;

  markers: Array<any> = [];

  icon = {
    url: "../../../assets/imgs/car-icon.png",
    scaledSize: new google.maps.Size(50, 60),
  };

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
    this.myMap = new google.maps.Map(this.mapElem, {
      center: this.myLatLng,
      zoom: 10,
    });
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
          lng: cstmLatLg.lng
        }
        this.addMarker(position)
      });
    });
  }

  addMarker(position){
    let myMarker = new google.maps.Marker({
      position: position,
      map: this.myMap,
      icon: this.icon,
    });

    //Delete event
    myMarker.addListener("click", () => {
      myMarker.setMap(null);
    });

    this.markers.push(myMarker);
  }

}
