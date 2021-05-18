import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coordinateInterface } from '../../models/coordinate.interface';
import { ServiceService } from '../../services/service.service';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})
export class MapComponent implements OnInit {
  map: any;
  park: any;
  @Input() point: any;
  @Input() radius: number;
  @Output() eventAction = new EventEmitter();
  coordinate: coordinateInterface;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getFileParkGeoJson().subscribe((response) => {
      this.park = response;
      var layer = L.geoJson(this.park).addTo(this.map);
      layer.on('click', (event: any) => {
        this.coordinate = event.latlng;
      });
    });
    this.map = L.map('mapId').setView([41.9058275, -6.9624076], 11);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(this.map);
  }
  _eventAction(): void {
    this.eventAction.emit(this.coordinate);
    if (this.coordinate) {
      if (this.radius !== 0) {
        L.circle(
          [this.coordinate.lat, this.coordinate.lng],
          this.radius / 1000
        ).addTo(this.map);
      }
    }
  }
}
