import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePlacePage } from './create-place.page';

describe('CreatePlacePage', () => {
  let component: CreatePlacePage;
  let fixture: ComponentFixture<CreatePlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
