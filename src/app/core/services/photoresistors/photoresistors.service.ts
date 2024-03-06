import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iPhotoresistor } from '../../interfaces/i-Photoresistor';

@Injectable({
  providedIn: 'root',
})
export class PhotoresistorsService {
  constructor(private http: HttpClient) {}

  getPhotoresistors(): Observable<iPhotoresistor[]> {
    return this.http.get<iPhotoresistor[]>(`${apiUrl}/photoresistors/`);
  }

  getLastPhotoresistor(): Observable<iPhotoresistor> {
    return this.http.get<iPhotoresistor>(`${apiUrl}/photoresistors/last/`);
  }

  getOnePhotoresistor(slotId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/photoresistors/${slotId}`);
  }

  createPhotoresistor(newSlot: iPhotoresistor): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/photoresistors/`, newSlot);
  }

  updatePhotoresistor(updatedSlot: iPhotoresistor, slotId: string): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/photoresistors/${slotId}`,
      updatedSlot
    );
  }

  deletePhotoresistor(slotId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/photoresistors/${slotId}`);
  }
}
