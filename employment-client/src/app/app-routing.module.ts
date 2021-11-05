import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HomeComponent } from './home/home.component';
import { MonthlyCompesationComponent } from './monthly-compesation/monthly-compesation.component';
import { ViewUserComponent } from './view-user/view-user.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
  },
  {
    path: 'employee/:id',
    component: ViewUserComponent,
  },
  {
    path: 'search-employees',
    component: HomeComponent,
  },
  {
    path: 'monthly-compesation',
    component: MonthlyCompesationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
