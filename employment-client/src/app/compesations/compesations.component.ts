import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Compesation from '../Classes/Compesation';
import Employee from '../Classes/Employee';

@Component({
  selector: 'app-compesations',
  templateUrl: './compesations.component.html',
})
export class CompesationsComponent implements OnInit {
  @Input()
  employeeData: Employee = {};
  id?: string;
  type?: string;
  month?: number;
  year?: number;
  description?: string;
  amount?: number;
  employeeID: any;

  messageError: string = '';
  displayCompesation: boolean = false;
  messageCompesation: boolean = false;
  displayCompesationEdit: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.employeeID = this.employeeData.id;
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

  editCompesationData(data: any) {
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

  showNewCompesation() {
    if (this.displayCompesation) this.displayCompesation = false;
    else this.displayCompesation = true;
  }

  saveUserCompesation(data: Employee) {
    return this.http.post(
      'http://localhost:8080/api/update-employee-compesation',
      data
    );
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

  closeEdit() {
    this.displayCompesationEdit = false;
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
