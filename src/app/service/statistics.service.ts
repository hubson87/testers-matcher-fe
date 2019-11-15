import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Tester} from "./model/tester";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + environment.statisticsEndpoint;
  }

  getStatistics(countries: string[], devices: string[]): Promise<Tester[]> {
    return this.httpClient.get(this.url, {
      params: {
        countryCodes: countries,
        deviceNames: devices
      }
    }).toPromise() as Promise<Tester[]>;
  }
}
