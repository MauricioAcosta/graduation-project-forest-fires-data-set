import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { estimateArea } from 'src/app/models/estimateArea.interface';
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
  @Input() affectedArea: estimateArea;
  @Output() eventAction = new EventEmitter();
  coordinate: coordinateInterface;
  sizeFire: string;
  constructor(private service: ServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.affectedArea && changes.affectedArea.currentValue !== 0) {
      console.log(changes);
      const area = parseInt(
        (changes.affectedArea.currentValue.area / 1000).toFixed(2)
      );
      const radius = parseInt(
        (changes.affectedArea.currentValue.radio / 1000).toFixed(2)
      );
      var iconUrl = '/assets/fire.gif';
      var icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [radius, radius],
        iconAnchor: [radius / 2, radius / 2],
      });
      L.marker([this.coordinate.lat, this.coordinate.lng], {
        icon: icon,
      })
        .addTo(this.map)
        .bindTooltip('Área (km): ' + area + '\n Radio (km): ' + radius, {
          permanent: true,
          direction: 'right',
        });
      L.circle([this.coordinate.lat, this.coordinate.lng], radius, {
        color: 'red',
        fillColor: '#e6701c',
        fillOpacity: 0.5,
      }).addTo(this.map);
      this.zoom2latLng(this.coordinate);
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
  zoom2latLng(latlng: coordinateInterface) {
    this.map.flyTo(latlng, 12); // you can specify pan/zoom options as well
  }
  _eventAction(): void {
    this.eventAction.emit(this.coordinate);
  }
}
