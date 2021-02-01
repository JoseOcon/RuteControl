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

  constructor(
    public _authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {}
  
  logOut(){
    this._authService.logOut();
    this.router.navigate(['/login'])
  }

}
