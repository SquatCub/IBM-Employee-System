import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-search-month',
  templateUrl: './search-month.component.html',
})
export class SearchMonthComponent implements OnInit {
  @Input()
  id?: string;

  month: number = 1;
  year: number = 2021;

  constructor() {}

  ngOnInit(): void {}

  changeMonth(month: any) {
    this.month = month.target.value;
  }

  changeYear(year: any) {
    this.year = year.target.value;
  }
}
