import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  //setting the selected subtopic 
  private selectedSubtopicSubject = new BehaviorSubject<string>('Client Compensation');
  selectedSubtopic$: Observable<string> = this.selectedSubtopicSubject.asObservable();

  setSelectedSubtopic(subtopic: string) {
    this.selectedSubtopicSubject.next(subtopic);
  }

  //setting Employee holidays from emp-sidebar to emp-dashboard component
  private empHolidaySubject = new BehaviorSubject<boolean>(false);//for the method below
  empHoliday$: Observable<boolean> = this.empHolidaySubject.asObservable();// called in emp-dashboard

  //called in emp-sidebar
  empHolidaysToggle() {
    const currentValue =  this.empHolidaySubject.value;
    this.empHolidaySubject.next(!currentValue);
  }

  // for div class main of the employee dashboard component (selected button from the sidebar should display)
  private selectedContentSubject = new BehaviorSubject<'applications' | 'calendar' | 'compensation'>('calendar');
  selectedContent$ = this.selectedContentSubject.asObservable();

  setSelectedContent(content: 'applications' | 'calendar' | 'compensation') {
    this.selectedContentSubject.next(content);
  }

  constructor() { }
}
