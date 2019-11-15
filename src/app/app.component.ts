import {Component, OnInit} from '@angular/core';
import {DictionaryService} from './service/dictionary.service';
import {DictionaryItem} from './service/model/dictionary-item';
import {StatisticsService} from './service/statistics.service';
import {Tester} from './service/model/tester';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testers-matcher-fe';
  countriesDict: DictionaryItem[];
  devicesDict: DictionaryItem[];
  contentLoaded: boolean;
  selectedCountries: string[];
  selectedDevices: string[];
  testers: Tester[];

  constructor(private dictionaryService: DictionaryService, private statisticsService: StatisticsService) {
    this.contentLoaded = false;
    this.selectedCountries = [];
    this.selectedDevices = [];
    this.testers = [];
  }

  ngOnInit(): void {
    this.dictionaryService.getDictionaries()
      .then(dict => {
        this.countriesDict = dict.countries;
        this.devicesDict = dict.devices;
        this.contentLoaded = true;
      })
      .catch(error => {
        console.log('Cannot obtain dictionaries from server', error);
        alert('Cannot connect to the server, please check connection and try again');
      });
  }

  assignCountries(event: string[]) {
    this.selectedCountries = event;
  }

  assignDevices(event: string[]) {
    this.selectedDevices = event;
  }

  getStatistics() {
    this.statisticsService.getStatistics(this.selectedCountries, this.selectedDevices)
      .then(stats => this.testers = stats)
      .catch(error => {
        console.log('Cannot obtain statistics from server', error);
        alert('Cannot connect to the server, please check connection and try again');
      });
  }
}
