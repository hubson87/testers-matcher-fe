import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {SelectionListComponent} from './selection-list.component';
import {By} from '@angular/platform-browser';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture<SelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ SelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise value change event when all values not selected', () => {
    let selectedValues: string[] = null;
    component.selectedDictValues = ['aaa', 'bbb'];
    component.selectedValuesEmitter.subscribe(res => selectedValues = res as string[]);

    component.setRadioValue(false);

    expect(selectedValues).not.toBe(null);
    expect(selectedValues).toContain('aaa');
    expect(selectedValues).toContain('bbb');
  });

  it('should clear value and emmit change event when all values selected', () => {
    component.selectedDictValues = ['aaa', 'bbb'];
    let selectedValues: string[] = component.selectedDictValues;
    component.selectedValuesEmitter.subscribe(res => selectedValues = res as string[]);

    component.setRadioValue(true);

    expect(selectedValues).not.toBe(null);
    expect(selectedValues).toEqual([]);
  });

  it('should not display main div if no dictionary present', () => {
    component.dictionary = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#mainDiv'))).toBe(null);
  });

  it('should display main div if dictionary present', () => {
    component.dictionary = [{name: 'name', code: 'code'}];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#mainDiv'))).not.toBe(null);
  });

  it('should display all values in a proper way', () => {
    const header = 'Title';
    const id = 'idVal';
    component.dictionary = [{name: 'elem1_name', code: 'elem1_code'}, {name: 'elem2_name', code: 'elem2_code'}];
    component.header = header;
    component.componentId = id;
    component.allValuesChecked = false;
    component.selectedDictValues = ['elem1_code'];

    fixture.detectChanges();

    const htmlElem = fixture.debugElement;
    expect(htmlElem.query(By.css('h2')).nativeElement.textContent).toBe('Title');

    expect(htmlElem.query(By.css('#idVal_allValRadio')).nativeElement.checked).toBeFalsy();
    expect(htmlElem.query(By.css('#idVal_chkValRadio')).nativeElement.checked).toBeTruthy();

    expect(htmlElem.query(By.css('select')).nativeElement.getAttribute('ng-reflect-model')).toEqual('elem1_code');
    expect(htmlElem.query(By.css('select')).nativeElement.children.length).toBe(2);
    expect(htmlElem.query(By.css('select')).nativeElement.children[0].value).toBe('0: \'elem1_code\'');
    expect(htmlElem.query(By.css('select')).nativeElement.children[1].value).toBe('1: \'elem2_code\'');
  });

});
