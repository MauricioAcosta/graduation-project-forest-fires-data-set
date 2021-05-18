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
  openModal(modal: any) {
    this.modalRef = this.modalService.open(modal, {
      backdropClass: 'light-blue-backdrop',
      centered: true,
      scrollable: true,
      windowClass: 'dark-modal',
      modalDialogClass: 'dark-modal',
      size: 'xl',
    });
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
    console.log(this.form);
    this.service
      .postEstimateAreaForestFire(this.dataSend)
      .subscribe((response: estimateArea) => {
        this.affectedArea = response;
        this.modalService.dismissAll();
      });
  }
}
