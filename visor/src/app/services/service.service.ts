import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  /**
   * get File Park GeoJson
   */
  public getFileParkGeoJson() {
    return this.httpClient.get('/assets/parque.geojson');
  }
}
