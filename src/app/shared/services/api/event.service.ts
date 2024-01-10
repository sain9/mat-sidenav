import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:9000/api/events'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${eventId}`;
    return this.http.put<any>(updateUrl, eventData);
  }

  deleteEvent(eventId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${eventId}`;
    return this.http.delete<void>(deleteUrl);
  }
  
}
