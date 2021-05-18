import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataForEstimate } from '../models/dataForEstimate.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  /**
   * get File Park GeoJson
   */
  public getFileParkGeoJson() {
    return this.httpClient.get('/assets/park.geojson');
  }
  /**
   * getEstimateAreaForestFire
   */
  public postEstimateAreaForestFire(data: dataForEstimate) {
    console.log('postEstimateAreaForestFire: ', data);
    return this.httpClient.post(
      'http://localhost:8000/area_affected_by_forest_fires/',
      data
    );
  }
}
