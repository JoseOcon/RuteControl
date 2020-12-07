import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaceDatailPage } from './place-datail.page';

describe('PlaceDatailPage', () => {
  let component: PlaceDatailPage;
  let fixture: ComponentFixture<PlaceDatailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDatailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceDatailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
