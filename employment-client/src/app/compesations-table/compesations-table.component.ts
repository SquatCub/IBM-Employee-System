import { Component, Input, OnInit } from '@angular/core';
import Compesation from '../Classes/Compesation';

@Component({
  selector: 'app-compesations-table',
  templateUrl: './compesations-table.component.html',
  styleUrls: ['./compesations-table.component.css'],
})
export class CompesationsTableComponent implements OnInit {
  @Input()
  compesations: Compesation[] = [{}];
  compesationTotal: number = 0;
  constructor() {}

  ngOnInit(): void {}

  setMonth(index: any) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[index - 1];
  }
  sumCompesation(val: number) {
    this.compesationTotal += val;
  }
}
