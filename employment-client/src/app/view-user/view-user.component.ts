import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Employee from '../Classes/Employee';
import Compesation from '../Classes/Compesation';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
})
export class ViewUserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  employeeID = this.route.snapshot.paramMap.get('id');
  employeeData: Employee = {};
  newCompesation: Compesation = {};
  displayCompesation: boolean = false;
  messageCompesation: boolean = false;
  messageError: string = '';

  ngOnInit(): void {
    this.fetchEmployee();
  }

  private fetchEmployee() {
    this.http
      .get(`http://localhost:8080/api/get-employee/${this.employeeID}`)
      .subscribe((employee) => {
        this.employeeData = employee;
        this.employeeData.compesationList!.sort((a, b) => {
          if (a.year === b.year) {
            return a.month! - b.month!;
          }
          return a.year! > b.year! ? 1 : -1;
        });
      });
  }

  checkDate(date: Date) {
    var today = new Date();
    var selected = new Date(date);
    if (today < selected) return true;
    return false;
  }

  saveUser(data: Employee) {
    return this.http.post('http://localhost:8080/api/update-employee', data);
  }
}
