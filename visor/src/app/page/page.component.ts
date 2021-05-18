import { Component, OnInit } from '@angular/core';
import { coordinateInterface } from '../models/coordinate.interface';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass'],
})
export class PageComponent implements OnInit {
  coordinate: coordinateInterface;
  point: any;
  constructor() {
    this.coordinate = {
      lat: 0,
      lng: 0,
    };
  }

  ngOnInit(): void {}
  getCoordinate($event: coordinateInterface) {
    this.coordinate = $event;
  }
}
