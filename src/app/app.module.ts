import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SelectionListComponent} from './selection-list/selection-list.component';
import {DictionaryService} from './service/dictionary.service';
import {StatisticsService} from './service/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    SelectionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DictionaryService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
