import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { GlobalService } from "../global/global.service";
import { TravelsService } from "../travels/travels.service";

@Component({
  selector: "app-add-events",
  templateUrl: "./add-events.page.html",
  styleUrls: ["./add-events.page.scss"],
})
export class AddEventsPage implements OnInit {
  @Input() myEvent;
  @Input() onlyShowInfo: boolean;
  @Input() travelId;

  eventFG: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _travelService: TravelsService,
    private _globalService: GlobalService,
    private router: Router
  ) {
    this.eventFG = this._fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      time: [""]
    });
  }

  ngOnInit() {
    if (this.onlyShowInfo) {
      this.eventFG.controls["name"].setValue(this.myEvent.nombre);
      this.eventFG.controls["description"].setValue(this.myEvent.descripcion);
      this.eventFG.controls["time"].setValue(this.myEvent.hora);
    }
  }

  createEvent() {
    let json = {
      nombre: this.eventFG.controls["name"].value,
      descripcion: this.eventFG.controls["description"].value,
      idViaje: this.travelId,
      cambiarRuta: 0,
      hora: new Date()
    };

    this._travelService.createTravelEvent(json).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this._globalService.showMessage(
            `¡Se ha creado el evento: ${json.nombre}!`
          );
          this.modalCtrl.dismiss();
          this.router.navigate(['/main-view'])
        } else {
          this._globalService.showMessage(
            "¡Ha ocurrido un error al intentar crear el evento!"
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        this._globalService.showMessage(`Error: ${err.message}`)
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
