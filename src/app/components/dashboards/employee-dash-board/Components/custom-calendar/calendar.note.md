# installation
# refrence docs : https://fullcalendar.io/docs/angular
npm i  @fullcalendar/core 
npm i  @fullcalendar/angular
npm i  @fullcalendar/daygrid  

# https://snyk.io/advisor/npm-package/@fullcalendar/interaction
npm install @fullcalendar/interaction

# include in app.module.ts
import { FullCalendarModule } from '@fullcalendar/angular';





<!-- To mark any event or present --- using localstorage in the calendar -->
# component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent implements OnInit {
  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [];

  calendarOptions: CalendarOptions = {
    // aspectRatio: 1.5,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  ngOnInit(): void {
    // Check if there's event data in localStorage
    const storedEvents = localStorage.getItem('calendarEvents');

    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
      this.updatePresentAbsentCount();
    }

    // Update calendarOptions with the retrieved events
    this.calendarOptions.events = this.events;
  }

  handleDateClick(arg: any) {
    const existingEvent = this.events.find((event: any) => event.date === arg.dateStr);
  
    if (existingEvent) {
      const newTitle = existingEvent.title === 'Present' ? 'Absent' : 'Present';
      existingEvent.title = newTitle;
      existingEvent.color = newTitle === 'Present' ? 'green' : 'red';
    } else {
      const title = prompt('Enter event title:');
      const color = title === 'Present' ? 'green' : 'red';
      if (title) {
        const newEvent = {
          title: title,
          date: arg.dateStr,
          color: color,
        };
        this.events.push(newEvent);
      }
    }
  
    this.updatePresentAbsentCount();
    this.updateEventsInLocalStorage();
  }

  handleEventClick(info: any) {
    const event = info.event;
    const eventIndex = this.events.findIndex(
      (e: any) => e.date === event.startStr && e.title === event.title
    );

    if (eventIndex !== -1) {
      this.events.splice(eventIndex, 1);
      this.updatePresentAbsentCount();
      this.updateEventsInLocalStorage();
      event.remove();
    }
  }

  updatePresentAbsentCount() {
    this.presentDays = this.events.filter((event: any) => event.title === 'Present').length;
    this.absentDays = this.events.filter((event: any) => event.title === 'Absent').length;
  }

  updateEventsInLocalStorage() {
    localStorage.setItem('calendarEvents', JSON.stringify(this.events));
  }
}

# component.html
<full-calendar [options]="calendarOptions"></full-calendar>


getting from event
event._def.extendedProps._id