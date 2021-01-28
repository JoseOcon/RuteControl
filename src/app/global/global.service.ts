import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async showMessage(msg: string) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: msg,
      position: "middle",
    });

    await toast.present();
  }

  async showAlert(msg: string, btns: any) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: btns,
    });

    await alert.present();
  }
  
}
