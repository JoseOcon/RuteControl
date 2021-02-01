import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Route } from "../interfaces/route";
import { Stop } from "../interfaces/stop";

@Injectable({
  providedIn: "root",
})
export class RoutesService {
  module = "route/";

  constructor(private http: HttpClient) {}

  getRoutes() {
    return this.http.get(`${environment.SERVER_BASE_URL}${this.module}`);
  }

  getRoute(id: number) {
    return this.http.get(`${environment.SERVER_BASE_URL}${this.module}`, {
      params: { id: id.toString() },
    });
  }

  createRoute(route: Route) {
    return this.http.post(
      `${environment.SERVER_BASE_URL}${this.module}`,
      route,
      {
        observe: "response",
      }
    );
  }

  addStop(stop: Stop) {
    return this.http.post(
      `${environment.SERVER_BASE_URL}stop/`,
      stop,
      {
        observe: "response",
      }
    );
  }

  removeStop(stopId: number) {
    return this.http.delete(
      `${environment.SERVER_BASE_URL}${this.module}removeStop`,
      { params: { id: stopId.toString() }, observe: "response" }
    );
  }

  updateRoute(newRoute){
    return this.http.patch(
      `${environment.SERVER_BASE_URL}${this.module}addStop`,
      newRoute,
      {
        observe: "response",
      }
    );
  }
}
