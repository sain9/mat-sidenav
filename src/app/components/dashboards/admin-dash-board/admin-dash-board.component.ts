import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/api/employee.service';


@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent {
  showFiller = false;

  sidenavOpen: boolean = false;
  
    constructor( private empService: EmployeeService ){
      this.empService.getSidenavState().subscribe((state) => {
        this.sidenavOpen = state;
        console.log("sidenav open status in dashboard: ",this.sidenavOpen );   
      });
    
    }

}
