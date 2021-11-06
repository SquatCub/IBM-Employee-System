import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Compesation from '../Classes/Compesation';
import Employee from '../Classes/Employee';

@Component({
  selector: 'app-monthly-compesation',
  templateUrl: './monthly-compesation.component.html',
})
export class MonthlyCompesationComponent implements OnInit {
  compesations: Compesation[] = [];
  compesationTotal: number = 0;
  employeeID = this.route.snapshot.queryParams['id'];
  compesationYear = this.route.snapshot.queryParams['year'];
  compesationMonth = this.route.snapshot.queryParams['month'];
  compesationExists: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCompesations();
  }

  private fetchCompesations() {
    this.http
      .get(
        `http://localhost:8080/api/compesation-by-date?id=${this.employeeID}&month=${this.compesationMonth}&year=${this.compesationYear}`
      )
      .subscribe((compesationRes) => {
        this.compesations = <Compesation[]>compesationRes;
        if (this.compesations!.length > 0) this.compesationExists = true;
        if (this.compesations!.length > 1) {
          this.compesations!.sort((a, b) => {
            if (a.year === b.year) {
              return a.month! - b.month!;
            }
            return a.year! > b.year! ? 1 : -1;
          });
        }
      });
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
  sumCompesation(val: number) {
    this.compesationTotal += val;
  }
}
