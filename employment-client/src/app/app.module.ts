import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HomeComponent } from './home/home.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule } from '@angular/forms';
import { CompesationsComponent } from './compesations/compesations.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SearchMonthComponent } from './search-month/search-month.component';
import { SearchRangeComponent } from './search-range/search-range.component';
import { MonthlyCompesationComponent } from './monthly-compesation/monthly-compesation.component';
import { CompesationsTableComponent } from './compesations-table/compesations-table.component';
import { RangeCompesationsComponent } from './range-compesations/range-compesations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddEmployeeComponent,
    HomeComponent,
    SearchEmployeeComponent,
    ViewUserComponent,
    CompesationsComponent,
    UpdateUserComponent,
    SearchMonthComponent,
    SearchRangeComponent,
    MonthlyCompesationComponent,
    CompesationsTableComponent,
    RangeCompesationsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
