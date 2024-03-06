import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iSlot } from '../../interfaces/i-Slot';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(private http: HttpClient) {}

  getSlots(): Observable<iSlot[]> {
    return this.http.get<iSlot[]>(`${apiUrl}/slots/`);
  }

  getOneSlot(slotId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/slots/${slotId}`);
  }

  createSlot(newSlot: iSlot): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/slots/`, newSlot);
  }

  updateSlot(updatedSlot: iSlot, slotId: string): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(`${apiUrl}/slots/${slotId}`, updatedSlot);
  }

  deleteSlot(slotId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/slots/${slotId}`);
  }
}
