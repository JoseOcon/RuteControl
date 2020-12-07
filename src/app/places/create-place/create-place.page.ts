import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {

  constructor(
    private placeService: PlacesService,
    private router: Router,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
  }

  createPlace(title: HTMLInputElement, imgURL:HTMLInputElement){
    this.placeService.addPlace(title.value, imgURL.value);
    this.globalService.showMessage("It was added!")
    this.router.navigate(['/places'])
  }
}
