import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../shared/Models/Login.model';
import { SignUpModel } from '../../shared/Models/SignUp.model';
import { EmployeeService } from 'src/app/shared/services/api/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSignupSuccessful: boolean = false;
 
  signUpModel: SignUpModel = new SignUpModel(); // Use SignUpModel
  loginModel: LoginModel = new LoginModel(); // Use LoginModel

  constructor(private http: HttpClient , private router: Router, private empService: EmployeeService) { } 

  onSignup() {
    this.http.post('http://localhost:9000/auth/register', this.signUpModel)
      .subscribe((response: any) => {
        // Save the token to local storage
        localStorage.setItem('registrationToken', response.data.token);
        console.log('Registration successful:', response);
  
        // Set the flag to true to indicate successful signup
        this.isSignupSuccessful = true;
        console.log("Registered: ",this.isSignupSuccessful);
        alert(`, ${this.signUpModel.username}, Registerd successfully Kindly Login!`);
        location.reload();
        
      }, (error) => {
        console.error('Registration failed:', error);
        alert(error.error.message)
      });
  }

  onLogin() {

    if (this.loginModel.username === 'admin' && this.loginModel.password === 'admin') {
      // Redirect to the adminDashboardComponent
      this.router.navigate(['/admin']); 
      this.empService.setisAdminStatus(true);
      alert("Admin Login Successfull!")
    } else {

      this.http.post('http://localhost:9000/auth/login', this.loginModel)
      .subscribe((response: any) => {
        console.log('Server Response:', response); // Log the server response
        localStorage.setItem('loginToken', response.data.token);
        console.log('Login successful:', response);
        this.router.navigate(['/employees']); 
        this.empService.setLoginStatus(true);
      }, (error) => {
        console.error('Login failed:', error);
        alert(error.error.message)
      });
    }
 }

}
