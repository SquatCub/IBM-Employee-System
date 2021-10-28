import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Employee from '../Classes/Employee';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent implements OnInit {
  @Input()
  public employeeData: Employee = {};
  message: string = '';
  display: boolean = false;
  employeeID: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.employeeID = this.employeeData.id;
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

  updateEmployeeData(data: Employee) {
    this.message = '';
    let flag = false;

    data.compesationList = this.employeeData.compesationList;
    if (data.firstName == '') this.message += 'First name ';
    if (data.lastName == '') this.message += 'Last name ';
    if (data.position == '') this.message += 'Position ';
    if (data.birthDate == '') this.message += 'Birth date ';
    if (this.checkDate(new Date(data.birthDate!))) {
      flag = true;
      this.message += ' ';
    }
    if (this.message != '') {
      if (this.message.length > 1) {
        this.message += 'field(s) required. ';
      }
      if (flag) this.message += 'Date is not valid, date cannot be after today';
      this.display = true;
    } else {
      this.saveUser(data).subscribe((res) => {
        const response = JSON.parse(JSON.stringify(res));
        if (response.code == 400) this.message = 'Employee already exists';
        else this.message = 'Employee Updated Correctly';
        this.display = true;
        this.fetchEmployee();
      });
    }
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
