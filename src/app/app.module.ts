
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HeaderComponent } from './components/header/header.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminDashBoardComponent } from './components/dashboards/admin-dash-board/admin-dash-board.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmployeeDashBoardComponent } from './components/dashboards/employee-dash-board/employee-dash-board.component';
import { EmpSidebarComponent } from './emp-sidebar/emp-sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomCalendarComponent } from './components/dashboards/employee-dash-board/Components/custom-calendar/custom-calendar.component';
import {  HttpClientJsonpModule } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ApplicationsComponent } from './components/dashboards/employee-dash-board/Components/applications/applications.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    AdminDashBoardComponent,
    SidebarComponent,
    EmployeeDashBoardComponent,
    EmpSidebarComponent,
    CustomCalendarComponent,
    ApplicationsComponent
  ],
  imports: [  
    HttpClientJsonpModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
