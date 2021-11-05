import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-month',
  templateUrl: './search-month.component.html',
})
export class SearchMonthComponent implements OnInit {
  month: number = 0;
  year: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
