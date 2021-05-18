import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { PageComponent } from './page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MapComponent, PageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
