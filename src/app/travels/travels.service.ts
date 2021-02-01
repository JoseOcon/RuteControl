import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TravelsService {
  module = "travel/";

  constructor(private http: HttpClient) {}

  getTravels(routeId: number) {
    return this.http.get(`${environment.SERVER_BASE_URL}${this.module}`, {
      params: { id: routeId.toString() },
    });
  }
}
