import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AuthService } from "../global/auth.service";
import { GlobalService } from "../global/global.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _globalService: GlobalService,
    private loadCtrl: LoadingController
  ) {
    this.loginForm = this._fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^(.{1,})[@](.{1,})[.](.{1,})$"),
        ],
      ],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async login() {
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;

    let loading = await this.loadCtrl.create();
    loading.present();

    this._authService.login(email, password).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.status == 200) {
          this._authService.userLocalSave(data.body.user);
          data.body.user.tipo == "Compañia"
            ? this._globalService.showMessage(
                `¡Ha iniciado sesión como la compañía: ${data.body.user.nombre}!`
              )
            : this._globalService.showMessage(
                `¡Bienvenido ${data.body.user.nombre}!`
              );
          this.router.navigate(["/main-view"]);
          loading.dismiss();
        } else {
          this._globalService.showMessage(`¡Ha ocurrido un error inesperado!`);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`¡Error: ${err.message}!`);
      },
    });
  }
}
