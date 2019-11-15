import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Dictionaries} from './model/dictionaries';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + environment.dictionariesEndpoint;
  }

  getDictionaries(): Promise<Dictionaries> {
    return this.httpClient.get(this.url).toPromise() as Promise<Dictionaries>;
  }
}
