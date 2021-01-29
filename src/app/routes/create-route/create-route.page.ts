import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Marker } from "src/app/interfaces/marker";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { GlobalService } from "src/app/global/global.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare var google;

@Component({
  selector: "app-create-route",
  templateUrl: "./create-route.page.html",
  styleUrls: ["./create-route.page.scss"],
})
export class CreateRoutePage implements OnInit {
  routeForm: FormGroup;

  mapElem: HTMLElement = null;
  indicatorsEle: HTMLElement = null;
  myMap = null;
  myLatLng = null;
  loading = null;
  showInfo: boolean = false;
  distance: number = 0;
  totalPrice: number = 0;
  duration: string = "00:00";
  stations: number = 0;

  markers: Array<any> = [];
  cars = [
    {
      id: 1,
      nombre: "Auto 1",
    },
    {
      id: 2,
      nombre: "Auto 2",
    },
  ];

  icon = {
    url: "../../../assets/imgs/car-icon.png",
    scaledSize: new google.maps.Size(60, 70),
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private _globalService: GlobalService,
    private _fb: FormBuilder
  ) {
    this.routeForm = this._fb.group({
      name: ["", [Validators.required]],
      car: ["", Validators.required],
      time: ["",Validators.required]
    });
  }

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

    //Delete event to remove marker
    myMarker.addListener("click", () => {
      this.markers = this.markers.filter(
        (elem) =>
          elem.position.toJSON().lat != myMarker.position.toJSON().lat &&
          elem.position.toJSON().lng != myMarker.position.toJSON().lng
      );
      myMarker.setMap(null);
      this.calculateRute();
      this.distance = 0;
      this.totalPrice = 0;
      this.duration = "00:00";
      this.stations = 0;
      this.getTotalDistance();
    });

    this.markers.push(myMarker);
    this.calculateRute();
    this.getTotalDistance();
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
          provideRouteAlternatives: true,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            var route = response.routes[0];
            var duration = 0;
            route.legs.forEach((leg) => {
              // The leg duration in seconds.
              duration += leg.duration.value;
            });

            let hours = Math.floor(duration / 3600);
            let minutes = Math.floor((duration - hours * 3600) / 60);
            this.duration =
              hours.toString().padStart(2, "0") +
              ":" +
              minutes.toString().padStart(2, "0");
            this.stations = this.markers.length - 2;
            this.directionsDisplay.setDirections(response);
          } else {
            alert("¡No existe ruta entre los puntos!" + status);
          }
        }
      );
    } else {
      //Delete the previus rute
      this.directionsDisplay.setDirections({ routes: [] });
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

  getTotalDistance() {
    if (this.markers.length > 2) {
      for (let i = 0; i < this.markers.length - 1; i++) {
        let position1 = this.markers[i].position.toJSON();
        let position2 = this.markers[i + 1].position.toJSON();
        this.distance += this.getDistanceFromLatLng(
          position1.lat,
          position1.lng,
          position2.lat,
          position2.lng
        );
      }
      this.distance = +this.distance.toFixed(2);
      this.totalPrice = +(this.distance * 182).toFixed(2); //Promedio de gasolina por km
    }
  }

  getDistanceFromLatLng(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  showHelp() {
    this._globalService.showMessage(
      "Presione para crear los puntos en la ruta. El primer punto se tomará como el origen y los siguientes" +
        " se tomarán como paradas a exesión del último el cual se refiere al punto de destino. Por último, para" +
        " eliminar un punto cualquiera presione sobre el mismo.",
      4500
    );
  }

  disableDialog(){
    if(!this.routeForm.valid || this.markers.length < 3){
      return true;
    }else{
      return false;
    }
  }
}
