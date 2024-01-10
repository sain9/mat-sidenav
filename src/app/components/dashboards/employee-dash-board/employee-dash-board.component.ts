import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BasicCompensation } from 'src/app/shared/Models/compensations/basic.compensation.model';
import { ClientCompensation } from 'src/app/shared/Models/compensations/client.compensation.model';
import { PerformanceCompensation } from 'src/app/shared/Models/compensations/performance.compensation.model';
import { SupportCompensation } from 'src/app/shared/Models/compensations/support.compensation.model';
import { DashBoardService } from 'src/app/shared/services/dash-board.service';
import { EmployeeService } from 'src/app/shared/services/api/employee.service';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.scss']
})
export class EmployeeDashBoardComponent implements OnInit {
  selectedSubtopic: string = '';
  isEmpHolidaysToggle: boolean = false;
  sidenavOpen: boolean = false;


  // Compensation models
  clientCompensation: ClientCompensation;
  supportCompensation: SupportCompensation;
  performanceCompensation: PerformanceCompensation;
  basicCompensation: BasicCompensation;

   selectedContent!: 'calendar' | 'applications'  | 'compensation' ;


  constructor(private empService: EmployeeService, private dashBoardService: DashBoardService) {
    this.empService.getSidenavState().subscribe((state) => {
      this.sidenavOpen = state;
      console.log("sidenav open status in dashboard: ", this.sidenavOpen);
  
    });

    // Initialize the compensation objects
    this.clientCompensation = new ClientCompensation(1, 'Client A', 1000, new Date());
    this.supportCompensation = new SupportCompensation(1, 'Support A', 500, new Date());
    this.performanceCompensation = new PerformanceCompensation(1, 'Employee A', 750, new Date());
    this.basicCompensation = new BasicCompensation(1, 'Employee B', 600, new Date());
  }

  ngOnInit() {
    this.dashBoardService.selectedSubtopic$.subscribe((subtopic) => {
      this.selectedSubtopic = subtopic;
      console.log("subtopic selected: ", this.selectedSubtopic);
    });

    this.dashBoardService.empHoliday$.subscribe((isToggle) => {
      this.isEmpHolidaysToggle = isToggle;
      console.log("employee holidays toggle value: ", this.isEmpHolidaysToggle);
    });

    // dashboard service selectedContent is Instantiate with calendar -check service
    this.dashBoardService.selectedContent$.subscribe((content) => {
      this.selectedContent = content;
      console.log('selectedContent: ', this.selectedContent);
    });
   
  }

  selectSubtopic(subtopic: string) {
    this.selectedSubtopic = subtopic;
  }
 

}
