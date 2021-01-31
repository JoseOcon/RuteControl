import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCompanyPage } from './my-company.page';

describe('MyCompanyPage', () => {
  let component: MyCompanyPage;
  let fixture: ComponentFixture<MyCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
