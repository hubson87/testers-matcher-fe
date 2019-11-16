import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DictionaryItem} from '../service/model/dictionary-item';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent {

  @Input() dictionary: DictionaryItem[];
  @Input() header: string;
  @Input() componentId: string;
  @Output() selectedValuesEmitter: EventEmitter<string[]>;
  allValuesChecked: boolean;
  selectedDictValues: string[];

  constructor() {
    this.allValuesChecked = true;
    this.selectedValuesEmitter = new EventEmitter<string[]>();
    this.selectedDictValues = [];
  }

  setRadioValue(allValuesChecked: boolean) {
    this.allValuesChecked = allValuesChecked;
    this.triggerChange();
  }

  triggerChange(): void {
    let elems: string[] = [];
    if (!this.allValuesChecked) {
      elems = this.selectedDictValues;
    }
    this.selectedValuesEmitter.emit(elems);
  }
}
