import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { coordinateInterface } from '../models/coordinate.interface';
import { dataForEstimate } from '../models/dataForEstimate.interface';
import { estimateArea } from '../models/estimateArea.interface';
import { formInterface } from '../models/form.interface';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass'],
})
export class PageComponent implements OnInit {
  form: formInterface;
  coordinate: coordinateInterface;
  modalRef: NgbModalRef;
  dataSend: dataForEstimate;
  activateSend: boolean;
  affectedArea: estimateArea;
  constructor(private modalService: NgbModal, private service: ServiceService) {
    this.form = {
      month: 0,
      day: 0,
      FFMC: 18.7,
      DMC: 1.1,
      DC: 7.9,
      ISI: 0,
      temp: 2.2,
      RH: 15.0,
      wind: 0.4,
      rain: 0,
    };
    this.activateSend = false;
    this.coordinate = {
      lat: 0,
      lng: 0,
    };
    this.affectedArea = {
      area: 0,
      radio: 0,
    };
  }

  ngOnInit(): void {}
  change() {
    if (this.form.month !== 0 && this.form.day !== 0) {
      this.activateSend = true;
    }
  }
  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  openModal(modal: any) {
    this.form = {
      month: this.getRndInteger(1, 12),
      day: this.getRndInteger(1, 7),
      DMC: this.getRndInteger(1.1, 291.3),
      DC: this.getRndInteger(7.9, 860.6),
      ISI: this.getRndInteger(0, 56.1),
      temp: this.getRndInteger(2.2, 33.3),
      RH: this.getRndInteger(15.0, 100),
      wind: this.getRndInteger(0.4, 9.4),
      rain: this.getRndInteger(0, 6.4),
      FFMC: this.getRndInteger(18.7, 96.2),
    };
    this.modalRef = this.modalService.open(modal, {
      backdropClass: 'light-blue-backdrop',
      centered: true,
      scrollable: true,
      windowClass: 'dark-modal',
      modalDialogClass: 'dark-modal',
      size: 'xl',
    });
    this.change();
  }
  getCoordinate($event: coordinateInterface, modal: any) {
    this.coordinate = $event;
    if (this.coordinate) {
      this.openModal(modal);
    }
  }
  send() {
    this.form.DC;
    this.dataSend = {
      latitud: this.coordinate.lat,
      longitud: this.coordinate.lng,
      ...this.form,
    };
    this.service
      .postEstimateAreaForestFire(this.dataSend)
      .subscribe((response: estimateArea) => {
        this.affectedArea = response;
        this.modalService.dismissAll();
      });
  }
}
