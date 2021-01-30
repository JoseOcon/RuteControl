import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverRoutesPage } from './driver-routes.page';

describe('DriverRoutesPage', () => {
  let component: DriverRoutesPage;
  let fixture: ComponentFixture<DriverRoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRoutesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
