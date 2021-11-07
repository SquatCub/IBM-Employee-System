import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-range',
  templateUrl: './search-range.component.html',
})
export class SearchRangeComponent implements OnInit {
  @Input()
  id?: string;

  startYear: number = 2021;
  startMonth: number = 1;

  endYear: number = 2021;
  endMonth: number = 1;
  constructor() {}

  ngOnInit(): void {}

  changeStartYear(event: any) {
    this.startYear = event.target.value;
  }
  changeStartMonth(event: any) {
    this.startMonth = event.target.value;
  }
  changeEndYear(event: any) {
    this.endYear = event.target.value;
  }
  changeEndMonth(event: any) {
    this.endMonth = event.target.value;
  }
}
