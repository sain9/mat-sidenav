import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from 'src/app/shared/Models/application.model';
import { EmployeeService } from 'src/app/shared/services/api/employee.service';
import { DashBoardService } from 'src/app/shared/services/dash-board.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  newApplication: Application = new Application();
  applicationForm!: FormGroup;

  constructor(private fb: FormBuilder, private empService: EmployeeService, private dashBoardService: DashBoardService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchApplications();
    
    
  }

  initializeForm() {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      purpose: ['', Validators.required],
      date: [null, Validators.required],
    });
  }

  isFormValid(): boolean {
    const controls = this.applicationForm.controls;
    return this.applicationForm.valid && controls['name'].value && controls['purpose'].value && controls['date'].value;
  }

  fetchApplications() {
    this.empService.getApplications().subscribe((data: Application[]) => {
      this.applications = data;
      console.log(this.applications);
    });
    
  }

  submitApplication() {
    if (this.isFormValid()) { 
      this.newApplication = {
        ...this.applicationForm.value,
      };
      console.log('Data to be sent:', this.newApplication);
      this.empService.submitApplication(this.newApplication).subscribe((data: Application) => {
        alert(` ${this.newApplication.name} ,Your application has been submitted Successfully !`)
        this.applicationForm.reset();
        this.fetchApplications();
      });
    }
  }

  goBack(){
    location.reload();
  }

}
