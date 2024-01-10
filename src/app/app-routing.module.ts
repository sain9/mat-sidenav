import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminDashBoardComponent } from './components/dashboards/admin-dash-board/admin-dash-board.component';
import { EmployeeDashBoardComponent } from './components/dashboards/employee-dash-board/employee-dash-board.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'admin',
    component: AdminDashBoardComponent
  },
  {
    path: 'employeeDashboard',
    component: EmployeeDashBoardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
