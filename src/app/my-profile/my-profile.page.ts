import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../global/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  userFG: FormGroup;
  user = null;
  
  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService
  ) {
    this.userFG = this._fb.group({
      name: ["", [Validators.required]],
      age: ["", Validators.required],
      email: ["", [Validators.required]],
      tel: ["", Validators.required],
    });
   }

  ngOnInit() {
    this.user = this._authService.getCurrentUser();
    this.userFG.controls['name'].setValue(this.user.nombre)
    this.userFG.controls['age'].setValue(this.user.edad)
    this.userFG.controls['email'].setValue(this.user.correo)
    this.userFG.controls['tel'].setValue(this.user.telefono)
  }

}
