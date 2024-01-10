import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/api/employee.service';
import { Employee } from '../../shared/Models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  add: boolean=false;
  cardView: boolean = true;
  editMode:boolean=false;
  empForm!: FormGroup ;
  employee = new Employee( );
  selectedEmployee: Employee | null = null; // Store the selected employee
  selectedCardIndex!: number;
  isAdminComponent: boolean = false;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      about: ['', Validators.required],
      joining_date: ['', Validators.required]
    });

    // Subscribe to isAdminComponent$ to get the status
    this.employeeService.isAdminComponent$.subscribe((status) => {
      this.isAdminComponent = status;
    });
}

  ngOnInit() {
    console.log("smployee says admin component: ",this.isAdminComponent);
    
    this.employeeService.getEmployees()
      .subscribe((response: any) => { // Use 'any' to accept any response format
        if (response.status === 'success') {
          this.employees = response.data; // Assign the 'data' property to employees
        } else {
          console.error('Error fetching employees:', response);
        }
      });
  }
  
  addEmpBtn(){
    this.add = true;
    this.cardView = false;
    this.editMode = false; // Clear edit mode when showing the form
    this.empForm.reset();
  }

  onEdit(selectedEmployee: Employee, index: number) {
    this.editMode = true;
    this.cardView =false;
    this.selectedCardIndex = index;
    this.selectedEmployee = selectedEmployee; // Store the selected employee
     // Set the `empForm` values to the selected employee's data
  this.empForm.setValue({
    name: selectedEmployee.name,
    position: selectedEmployee.position,
    about: selectedEmployee.about,
    joining_date: new Date(selectedEmployee.joining_date),
  });
  }


  addEmployee() {
    if (this.empForm.valid) {
      const newEmployee = this.empForm.value as Employee;
      this.employeeService.addEmployee(newEmployee).subscribe(
        (data: Employee) => {
          // Handle the response, e.g., update the UI or show a success message.
          this.employees.push(data); // Add the new employee to the local array.
          this.empForm.reset(); // Clear the form.
          this.add = false; // Hide the form.
          location.reload();
        },
        (error) => {
          console.error('Error adding employee:', error);
     
        }
      );
    }
  }

  deleteEmployee(employeeId: string) {
    console.log('Employee ID to delete:', employeeId); //  for debugging
    this.employeeService.deleteEmployee(employeeId).subscribe( () => {
        this.employees = this.employees.filter(employee => employee._id !== employeeId);
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }


  updateEmployee() {
    if (this.empForm.valid) {
      const updatedEmployee = this.empForm.value as Employee;
      if (this.empForm.valid && this.selectedEmployee) 
        updatedEmployee._id = this.selectedEmployee._id; // Use the ID from the selected employee
      // Find the index of the employee to be updated
      const index = this.employees.findIndex((e) => e._id === updatedEmployee._id);
      if (index !== -1) {
        this.employeeService.updateEmployee(updatedEmployee).subscribe(
          (data: Employee) => {
            // Update the employee in the local array
            this.employees[index] = data;
            this.empForm.reset();
            this.editMode = false;
            this.cardView = true;
            location.reload();
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
      }
    }   
  }
 
  
  goBack(){
    this.empForm.reset();
    location.reload();
  }

  
}

