import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../global/auth.service';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.page.html',
  styleUrls: ['./my-company.page.scss'],
})
export class MyCompanyPage implements OnInit {

  companyFG: FormGroup;
  company = null;
  
  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService
  ) {
    this.companyFG = this._fb.group({
      name: ["", [Validators.required]],
      id: ["", Validators.required],
      manager: ["", Validators.required],
      email: ["", [Validators.required]],
      tel: ["", Validators.required],
      ubication: ["", Validators.required],
      description: ["", Validators.required],
    });
   }

  ngOnInit() {
    this.company = this._authService.getCurrentUser();
    this.companyFG.controls['name'].setValue(this.company.nombre)
    this.companyFG.controls['id'].setValue(this.company.identificacion)
    this.companyFG.controls['manager'].setValue(this.company.encargado)
    this.companyFG.controls['email'].setValue(this.company.email)
    this.companyFG.controls['tel'].setValue(this.company.telefono)
    this.companyFG.controls['ubication'].setValue(this.company.direccion)
    this.companyFG.controls['description'].setValue(this.company.descripcion)
  }

}
