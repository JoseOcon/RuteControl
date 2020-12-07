import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "src/app/global/global.service";
import { Place } from "../place.model";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-place-datail",
  templateUrl: "./place-datail.page.html",
  styleUrls: ["./place-datail.page.scss"],
})
export class PlaceDatailPage implements OnInit {
  place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private router: Router,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      //validar si viene parámetro
      const recipeId = paramMap.get("placeId");
      this.place = this.placesService.getPlace(recipeId);
    });
  }

  async deletePlace() {
    this.globalService.showAlert("Are you sure to delete it?", [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Yes",
        handler: () => {
          this.placesService.deletePlace(this.place.id)
          this.globalService.showMessage("The place was deleted!")
          this.router.navigate(['/places'])
        }
      },
    ]);
  }
}
