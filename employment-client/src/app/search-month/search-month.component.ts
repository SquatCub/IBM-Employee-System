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

  ngOnInit(): void {
    console.log(this.id);
  }

  changeMonth(month: any) {
    this.month = month.target.value;
    console.log(month.target.value);
  }

  changeYear(year: any) {
    this.year = year.target.value;
    console.log(year.target.value);
  }
}
