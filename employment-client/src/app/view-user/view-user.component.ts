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

  id?: string;
  type?: string;
  month?: number;
  year?: number;
  description?: string;
  amount?: number;

  employeeID = this.route.snapshot.paramMap.get('id');
  employeeData: Employee = {};
  newCompesation: Compesation = {};

  display: boolean = false;
  displayCompesation: boolean = false;
  messageCompesation: boolean = false;
  displayCompesationEdit: boolean = false;
  message: string = '';
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

  updateCompesationData(data: Compesation) {
    data.month = parseInt(data.month!.toString());
    data.year = parseInt(data.year!.toString());
    let auxMessage: string = '';
    if (data.type == 'Bonus' && data.amount! <= 0) {
      auxMessage += 'Bonus selected, amount must be greater than zero';
    } else if (
      (data.type == 'Commission' || data.type == 'Allowance') &&
      (data.description == '' || data.amount! <= 0)
    ) {
      auxMessage +=
        'Commission or Allowance selected, description must not be empty and amount must be greater than zero';
    } else if (
      data.type == 'Adjustment' &&
      (data.description == '' || data.amount == 0)
    ) {
      auxMessage +=
        'Adjustment selected, description must not be empty or data must not be zero';
    }
    if (auxMessage.length > 0) {
      this.messageCompesation = true;
      this.messageError = auxMessage;
    } else {
      this.employeeData.compesationList?.push(data);

      this.saveUserCompesation(this.employeeData).subscribe((res) => {
        const response = JSON.parse(JSON.stringify(res));
        if (response.code == 400)
          this.messageError = 'Compesation already exists in the date';
        else this.messageError = 'Compesation added succesfully';

        this.messageCompesation = true;
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

  saveUserCompesation(data: Employee) {
    return this.http.post(
      'http://localhost:8080/api/update-employee-compesation',
      data
    );
  }

  editCompesationData(data: any) {
    data.month = parseInt(data.month!.toString());
    data.year = parseInt(data.year!.toString());
    this.employeeData.compesationList![data.id].type = data.type;
    this.employeeData.compesationList![data.id].month = data.month;
    this.employeeData.compesationList![data.id].year = data.year;
    this.employeeData.compesationList![data.id].description = data.description;
    this.employeeData.compesationList![data.id].amount = data.amount;

    let auxMessage: string = '';
    if (data.type == 'Bonus' && data.amount! <= 0) {
      auxMessage += 'Bonus selected, amount must be greater than zero';
    } else if (
      (data.type == 'Commission' || data.type == 'Allowance') &&
      (data.description == '' || data.amount! <= 0)
    ) {
      auxMessage +=
        'Commission or Allowance selected, description must not be empty and amount must be greater than zero';
    } else if (
      data.type == 'Adjustment' &&
      (data.description == '' || data.amount == 0)
    ) {
      auxMessage +=
        'Adjustment selected, description must not be empty or data must not be zero';
    }
    if (auxMessage.length > 0) {
      this.messageCompesation = true;
      this.messageError = auxMessage;
    } else {
      this.saveUserCompesation(this.employeeData).subscribe((res) => {
        const response = JSON.parse(JSON.stringify(res));
        if (response.code == 400)
          this.messageError = 'Compesation already exists in the date';
        else this.messageError = 'Compesation edited succesfully';

        this.messageCompesation = true;
        this.fetchEmployee();
      });
    }
  }

  edit(index: any) {
    this.displayCompesationEdit = true;
    this.id = index;
    this.type = this.employeeData.compesationList![index].type;
    this.month = this.employeeData.compesationList![index].month;
    this.year = this.employeeData.compesationList![index].year;
    this.description = this.employeeData.compesationList![index].description;
    this.amount = this.employeeData.compesationList![index].amount;
  }

  closeEdit() {
    this.displayCompesationEdit = false;
  }

  showNewCompesation() {
    if (this.displayCompesation) this.displayCompesation = false;
    else this.displayCompesation = true;
  }
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
}
