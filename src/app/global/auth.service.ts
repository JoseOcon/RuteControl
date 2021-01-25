import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  users: [];

  constructor(
    private _http: HttpClient
  ) {}

  userLocalSave(user): void {
    localStorage.setItem(
      `${environment.localstorage_key}`,
      JSON.stringify(user)
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(`${environment.localstorage_key}`));
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  login(email: String, password: String) {
    return this._http.post(
      `${environment.SERVER_BASE_URL}user/`,
      { correo: email, contraseña: password }
    );
  }

  logOut() {
    localStorage.removeItem(`${environment.localstorage_key}`);
  }
}
