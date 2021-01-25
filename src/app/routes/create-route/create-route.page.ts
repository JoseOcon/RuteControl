import { Component, OnInit } from "@angular/core";
import { LoadingController } from '@ionic/angular';
import { Geolocation } from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: "app-create-route",
  templateUrl: "./create-route.page.html",
  styleUrls: ["./create-route.page.scss"],
})
export class CreateRoutePage implements OnInit {

  myMap = null;
  myLatLng = null;
  loading = null;

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


  async getLocation(){
    const rute = await this.geolocation.getCurrentPosition();
    this.myLatLng = {
      lat: rute.coords.latitude,
      lng: rute.coords.longitude,
    };
  }

  createMap(){
    const myMap: HTMLElement = document.getElementById("map");
    this.myMap = new google.maps.Map(myMap, {
      center: this.myLatLng,
      zoom: 10,
    });
  }

  addMapEvents(){
    google.maps.event.addListenerOnce(this.myMap, "idle", () => {
      this.loading.dismiss();
      this.addMarker(this.myLatLng.lat, this.myLatLng.lng);
    });
  }

  addMarker(lat: Number, lng: Number){
    const marker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map: this.myMap
    });
  }

}
