import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { coordinateInterface } from '../../models/coordinate.interface';
import { ServiceService } from '../../services/service.service';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})
export class MapComponent implements OnInit, OnChanges {
  map: any;
  park: any;
  @Input() radius: number;
  @Output() eventAction = new EventEmitter();
  coordinate: coordinateInterface;
  sizeFire: string;
  constructor(private service: ServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.radius && changes.radius.currentValue !== 0) {
      console.log(changes);
      var radius = changes.radius.currentValue / 1000;
      var iconUrl = '/assets/fire.gif';
      var icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [radius, radius],
        iconAnchor: [radius / 2, radius / 2],
      });
      L.marker([this.coordinate.lat, this.coordinate.lng], {
        icon: icon,
      }).addTo(this.map);
    }
  }

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
  }
}
