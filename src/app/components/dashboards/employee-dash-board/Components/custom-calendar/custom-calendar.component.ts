import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/shared/services/api/event.service';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent implements OnInit {
  events: any = [];

  calendarOptions: CalendarOptions = {
    aspectRatio: 1.5,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customizeEventContent.bind(this), // Customize event content
  };

  // Function to customize event content
  customizeEventContent(info: any) {
    const event = info.event;
    const eventElement = document.createElement('div');
    eventElement.textContent = event.title; // Display only the event title
    eventElement.style.backgroundColor = event.backgroundColor; // Set the background color
    eventElement.style.fontSize = '18px';
    // eventElement.style.width= '100%';
    eventElement.style.color= 'white';
    eventElement.style.fontFamily = 'Sans serif';
    eventElement.style.fontStyle = 'Italic';
    return { domNodes: [eventElement] };
  }

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: any[]) => {
      this.events = events;
      this.calendarOptions.events = this.events;
    });
  }

  // Handle date click
  handleDateClick(arg: any) {
    const title = prompt('Enter event title:');
    if (title) {
      const color = title === 'Present' ? 'green' : 'Red';
      const newEvent = {
        title: title,
        date: arg.dateStr,
        color: color,
      };
      this.eventService.addEvent(newEvent).subscribe((event: any) => {
        this.events.push(event);
      });
    }
  }

  // Handle event click
  handleEventClick(info: any) {
    const event = info.event;
    const eventId = event._def.extendedProps._id;
    // Find the event in your events array
    // Find the event in your events array using the event ID
  const eventIndex = this.events.findIndex((e: any) => e._id === eventId);

      console.log("eventIndex: ",eventIndex);
      
    if (eventIndex !== -1) {
    

      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.events.splice(eventIndex, 1);
        event.remove();
      });
    }
  }
}
