import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {DictionaryService} from './service/dictionary.service';
import {StatisticsService} from './service/statistics.service';
import {SelectionListComponent} from './selection-list/selection-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Dictionaries} from './service/model/dictionaries';
import {from} from 'rxjs';
import {Tester} from './service/model/tester';
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        DictionaryService,
        StatisticsService
      ],
      declarations: [
        AppComponent,
        SelectionListComponent
      ]
    }).compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should obtain dictionaries', fakeAsync(inject([DictionaryService], (dictService: DictionaryService) => {
    const country = [{code: 'PL', name: 'Poland'}, {code: 'DE', name: 'Germany'}];
    const dev = [{code: 'ip', name: 'iPhone'}, {code: 'sm', name: 'Samsung'}];
    const dictionaries: Dictionaries = {countries: country, devices: dev};
    spyOn(dictService, 'getDictionaries').and.callFake(() => {
      return from([dictionaries]).toPromise();
    });

    component.ngOnInit();
    tick(100);

    expect(component.devicesDict).toEqual(dictionaries.devices);
    expect(component.countriesDict).toEqual(dictionaries.countries);
  })));

  it('should obtain testers', fakeAsync(inject([StatisticsService], (statService: StatisticsService) => {
    const testers: Tester[] = [{
      devicesCount: 0,
      testerLastName: 'surname',
      testerFirstName: 'name',
      bugsCount: 0,
      country: 'PL'
    }];
    spyOn(statService, 'getStatistics').and.callFake((countries, devices) => {
      return from([testers]).toPromise();
    });

    component.getStatistics();
    tick(100);

    expect(component.testers).toEqual(testers);
  })));

  it('should trigger statistics when button clicked', fakeAsync(inject([StatisticsService], (statService: StatisticsService) => {
    const spyOnStats = spyOn(statService, 'getStatistics').and.callFake((countries, devices) => {
      return from([]).toPromise();
    });
    component.contentLoaded = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#statButton')).nativeElement.click();

    expect(spyOnStats).toHaveBeenCalledTimes(1);
  })));

});

