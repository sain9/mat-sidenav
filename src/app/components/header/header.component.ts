import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/api/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged: boolean = true;
  isAdmin: boolean = false;

//if in admin dashboard then only menu button should be shown in the header
  isAdminComponent: boolean  = false;

  constructor( private empService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute ) {
        this.empService.getLoginStatus().subscribe( (status) => {
            this.isLogged = status;
            console.log("is Logged status in header: ",this.isLogged );   
        });

        this.empService.getIsAdminStatus().subscribe( (status) => {
          this.isAdmin = status;
          console.log("isAdmin status in dashboard: ",this.isAdmin );   
      });
     
      this.router.events.subscribe((event) => {
       if (event instanceof NavigationEnd) {
        this.isAdminComponent = this.isInAdminComponent();
        console.log("is admin cmp: ",this.isAdminComponent);
        
        // Set isAdminComponent status through the service
        this.empService.setIsAdminComponent(this.isAdminComponent);
    }
  });
}

//check whether we are in /admin or not
isInAdminComponent(): boolean {
  let route = this.activatedRoute;
  while (route.firstChild) {
    route = route.firstChild;
  }
  if (route.routeConfig && route.routeConfig.path) {
    return route.routeConfig.path === 'admin';
  }
  return false;
}



  toggleSidenav() {
    this.empService.toggleSidenav();
    console.log("toggle clicked"); 
  }

}
