import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  name: string = '';
  last: string = '';
  position: string = '';

  employees: any;
  employeesNotExists: boolean = true;

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams['name'];
    this.last = this.route.snapshot.queryParams['last'];
    this.position = this.route.snapshot.queryParams['position'];
    if (this.name != null || this.last != null || this.position != null) {
      this.fetchByFilter();
    } else {
      this.fetchEmployees();
    }
  }

  recieveResponse() {
    this.ngOnInit();
  }

  private fetchEmployees() {
    this.http
      .get('http://localhost:8080/api/get-all-employees')
      .subscribe((employees) => {
        this.employees = employees;
        if (this.employees.length > 0) this.employeesNotExists = false;
      });
  }
  private fetchByFilter() {
    this.http
      .get(
        `http://localhost:8080/api/search-employees?firstName=${this.name}&lastName=${this.last}&position=${this.position}`
      )
      .subscribe((employees) => {
        this.employees = employees;
        if (this.employees.length > 0) this.employeesNotExists = false;
      });
  }
}
