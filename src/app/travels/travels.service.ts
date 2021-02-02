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

  getTravel(travelId: number) {
    return this.http.get(
      `${environment.SERVER_BASE_URL}${this.module}${travelId}`
    );
  }

  getTravelUsers(travelId: number) {
    return this.http.get(`${environment.SERVER_BASE_URL}user/${travelId}`);
  }

  getTravelEvents(travelId: number) {
    return this.http.get(`${environment.SERVER_BASE_URL}event/${travelId}`);
  }

  createTravel(routeId: number) {
    let json = {
      idRuta: routeId,
    };
    return this.http.post(
      `${environment.SERVER_BASE_URL}${this.module}`,
      json,
      { observe: "response" }
    );
  }

  createTravelEvent(event){
    return this.http.post(
      `${environment.SERVER_BASE_URL}event/`,
      event,
      { observe: "response" }
    );
  }

  updateTravelUserState(userTravel) {
    return this.http.put(`${environment.SERVER_BASE_URL}${this.module}userTravel`, userTravel, {
      observe: "response",
    });
  }
}
