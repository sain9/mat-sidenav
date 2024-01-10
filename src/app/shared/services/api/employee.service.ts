import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../Models/employee.model';
import { Application } from '../../Models/application.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const addEmployeeUrl = `${this.baseUrl}/api/employees/register`; 
    return this.http.post<Employee>(addEmployeeUrl, employee);
    // return this.http.post<Employee>(this.baseUrl, employee);
  }

  deleteEmployee(employeeId: string): Observable<void> {
    const deleteEmployeeUrl = `${this.baseUrl}/api/employees/delete/${employeeId}`;
    return this.http.delete<void>(deleteEmployeeUrl);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const updateEmployeeUrl = `${this.baseUrl}/api/employees/update/${employee._id}`;
    // Use PUT or PATCH HTTP method to update the employee, depending on your API.
    return this.http.put<Employee>(updateEmployeeUrl, employee);
  }

//for employee Application
  // method to fetch applications 
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/api/applications`);
  }

  //  method to submit a new application
  submitApplication(applicationData: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}/api/applications`, applicationData);
  }

  

  //shared between login and header
  private loginStatus = new BehaviorSubject<boolean>(false);

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

  //shared between login and dashboard
  private isAdmin = new BehaviorSubject<boolean>(false);

  setisAdminStatus(status: boolean) {
    this.isAdmin.next(status);
  }
  getIsAdminStatus() {
    return this.isAdmin.asObservable();
  }






  //shared between header , dashboard
  private sidenavOpen = new BehaviorSubject<boolean>(false);

  toggleSidenav() {
    this.sidenavOpen.next(!this.sidenavOpen.value);
  }
  getSidenavState() {
    return this.sidenavOpen.asObservable();
  }

  //to set the adminComponent routes status
  private isAdminComponentSubject = new BehaviorSubject<boolean>(false);
  isAdminComponent$ = this.isAdminComponentSubject.asObservable();

  // Method to set the isAdminComponent status
  setIsAdminComponent(status: boolean) {
    this.isAdminComponentSubject.next(status);
  }
}
