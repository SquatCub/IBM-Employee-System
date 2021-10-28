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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
