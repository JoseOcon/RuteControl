import { Component, OnInit } from '@angular/core';
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
  ]

  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit() {}

}
