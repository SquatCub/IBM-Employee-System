import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
})
export class SearchEmployeeComponent implements OnInit {
  @Output() newResponseEvent = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  employeeFirstName =
    typeof this.route.snapshot.queryParams['name'] !== 'undefined'
      ? this.route.snapshot.queryParams['name']
      : '';
  employeeLastName =
    typeof this.route.snapshot.queryParams['last'] !== 'undefined'
      ? this.route.snapshot.queryParams['last']
      : '';
  employeePosition =
    typeof this.route.snapshot.queryParams['position'] !== 'undefined'
      ? this.route.snapshot.queryParams['position']
      : '';

  ngOnInit(): void {}

  onChangeFirstName(event: Event) {
    this.employeeFirstName = (<HTMLInputElement>event.target).value;
  }

  onChangeLastName(event: Event) {
    this.employeeLastName = (<HTMLInputElement>event.target).value;
  }

  onChangePosition(event: Event) {
    this.employeePosition = (<HTMLInputElement>event.target).value;
  }

  onClickClear() {
    this.employeeFirstName = '';
    this.employeeLastName = '';
    this.employeePosition = '';
  }

  onClickSubmit() {
    if (
      this.employeeFirstName != '' ||
      this.employeeLastName != '' ||
      this.employeePosition != ''
    ) {
      this.router
        .navigate(['search-employees'], {
          queryParams: {
            name: this.employeeFirstName,
            last: this.employeeLastName,
            position: this.employeePosition,
          },
        })
        .then(() => {
          this.newResponseEvent.emit();
        });
    } else {
      this.router.navigate(['']);
    }
  }
}
