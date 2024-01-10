import { Component, EventEmitter, Output } from '@angular/core';
import { DashBoardService } from '../shared/services/dash-board.service';

@Component({
  selector: 'app-emp-sidebar',
  templateUrl: './emp-sidebar.component.html',
  styleUrls: ['./emp-sidebar.component.scss']
})
export class EmpSidebarComponent {
  isHovered: boolean = false;
//mouseevents for compensation
  onEnter() {
    this.isHovered = true;
  }
  onLeave() {
    this.isHovered = false;
  }
  showSubtopics: boolean = false;
  toggleSubtopics() {
    this.showSubtopics = !this.showSubtopics;
  }

  constructor( private dashBoardService: DashBoardService ) {
  }

  selectedSubtopic: string = '';
  selectSubtopic(subtopic: string) {
    this.selectedSubtopic = subtopic;
    this.dashBoardService.setSelectedSubtopic(subtopic);
    this.toggleSubtopics();
  }

  //Emoloyee holidays clicked
  onEmpHolidaysClick(){
    this.dashBoardService.empHolidaysToggle();
    // this.dashBoardService.setSelectedSubtopic('')
  }

//logic for selecting item from sidebar and displaying only that in the main div class of the dashboard
 selectedContent!: 'calendar' | 'applications'  | 'compensation' ;
 selectContent(content: 'applications' | 'calendar' | 'compensation') {
  this.selectedContent = content;
}
onApplicationsClick() {
  this.dashBoardService.setSelectedContent('applications'); // Set the selected content
  //sets showSubtopics to false if it is true (opened) and you open aplication menu on top of it
  if(this.showSubtopics ){
    this.toggleSubtopics();
  }
}

onCalendarClick() {
  this.dashBoardService.setSelectedContent('calendar'); // Set the selected content
}

onCompensationClick() {
  this.dashBoardService.setSelectedContent('compensation'); // Set the selected content
}

}
