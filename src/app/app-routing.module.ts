import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { environment } from "src/environments/environment";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "places",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./places/places.module").then((m) => m.PlacesPageModule),
      },
      {
        path: ":placeId",
        loadChildren: () =>
          import("./places/place-datail/place-datail.module").then(
            (m) => m.PlaceDatailPageModule
          ),
      },
    ],
  },
  {
    path: "create-place",
    loadChildren: () =>
      import("./places/create-place/create-place.module").then(
        (m) => m.CreatePlacePageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "main-view",
    loadChildren: () =>
      import("./main-view/main-view.module").then((m) => m.MainViewPageModule),
  },
  {
    path: "routes",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./routes/routes.module").then((m) => m.RoutesPageModule),
      },
      {
        path: ":routeId",
        loadChildren: () =>
          import("./routes/route-details/route-details.module").then(
            (m) => m.RouteDetailsPageModule
          ),
      },
    ],
  },
  {
    path: "create-route",
    loadChildren: () =>
      import("./routes/create-route/create-route.module").then(
        (m) => m.CreateRoutePageModule
      ),
  },
  {
    path: "driver-routes",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./driver-routes/driver-routes.module").then(
            (m) => m.DriverRoutesPageModule
          ),
      },
      {
        path: ":travelId",
        loadChildren: () =>
          import("./driver-routes/travel-details/travel-details.module").then(
            (m) => m.TravelDetailsPageModule
          ),
      },
    ],
  },
  {
    path: "travels",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./travels/travels.module").then((m) => m.TravelsPageModule),
      },
      {
        path: ":travelId",
        loadChildren: () =>
          import("./travels/travel-details/travel-details.module").then(
            (m) => m.TravelDetailsPageModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo:
      JSON.parse(localStorage.getItem(`${environment.localstorage_key}`)) ===
      null
        ? "login"
        : "main-view",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
