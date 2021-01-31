import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/global/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  options = [
    {
      icon: "location-outline",
      name: "Gestión de Rutas",
      redirectTo: "/routes"
    },
    {
      icon: "car-outline",
      name: "Realizar Viajes",
      redirectTo: "/driver-routes"
    },
    {
      icon: "map-outline",
      name: "Gestión de Viajes",
      redirectTo: "/travels"
    },
  ]

  constructor(
    public _authService: AuthService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {}
  
  onSearchChange(event){

  }

}
