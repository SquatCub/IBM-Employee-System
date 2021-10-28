import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent implements OnInit {
  display: boolean = false;
  message: string = '';
  constructor(private http: HttpClient) {}

  getEmployeeData(data: any) {
    this.message = '';
    let flag = false;
    if (data.firstName == '') this.message += 'First name ';
    if (data.lastName == '') this.message += 'Last name ';
    if (data.position == '') this.message += 'Position ';
    if (data.birthDate == '') this.message += 'Birth date ';
    data.compesation = [];
    if (this.checkDate(data.birthDate)) {
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
        else this.message = 'Employee Saved Correctly';
        this.display = true;
      });
    }

    /**/
  }

  checkDate(date: Date) {
    var today = new Date();
    var selected = new Date(date);
    if (today < selected) return true;
    return false;
  }

  saveUser(data: any) {
    return this.http.post('http://localhost:8080/api/create-employee', data);
  }

  ngOnInit(): void {}
}
