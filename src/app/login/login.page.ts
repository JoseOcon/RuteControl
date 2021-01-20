import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../global/auth.service";
import { GlobalService } from "../global/global.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _globalService: GlobalService
  ) {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.pattern('^(.{1,})[@](.{1,})[.](.{1,})$')]],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  login() {

    let email = this.loginForm.controls['email'].value
    let password = this.loginForm.controls['password'].value
    console.log(email, password)

    this._authService.login(email, password).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this._authService.userLocalSave(data.user);
          //TODO: Validar si es empresa o chofer y redireccionar a su debida vista
          this._globalService.showMessage(`¡Bienvenido ${data.user.nombre}!`);
          this.router.navigate(["/places"]);
        } else {
          this._globalService.showMessage(`¡Ha ocurrido un error inesperado!`);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`¡Error: ${err.message}!`);
      },
    });
    //TODO: QUITAR
    this.router.navigate(["/main-view"]);
    this._authService.userLocalSave({
      nombre: "pepe"
    });
  }
}
