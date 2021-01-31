import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.page.html',
  styleUrls: ['./add-events.page.scss'],
})
export class AddEventsPage implements OnInit {

  @Input() travelId;
  eventFG: FormGroup

  constructor(
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
  ) { 
    this.eventFG = this._fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  createEvent(){
    
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }
}
