import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iHumiditySensor } from '../../interfaces/i-HumiditySensor';

@Injectable({
  providedIn: 'root',
})
export class HumiditySensorsService {
  constructor(private http: HttpClient) {}

  getHumiditySensors(): Observable<iHumiditySensor[]> {
    return this.http.get<iHumiditySensor[]>(`${apiUrl}/humidity-sensors/`);
  }

  getLastHumiditySensor(): Observable<iHumiditySensor> {
    return this.http.get<iHumiditySensor>(`${apiUrl}/humidity-sensors/last/`);
  }

  getOneHumiditySensor(slotId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/humidity-sensors/${slotId}`);
  }

  createHumiditySensor(newSlot: iHumiditySensor): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/humidity-sensors/`, newSlot);
  }

  updateHumiditySensor(
    updatedSlot: iHumiditySensor,
    slotId: string
  ): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/humidity-sensors/${slotId}`,
      updatedSlot
    );
  }

  deleteHumiditySensor(slotId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/humidity-sensors/${slotId}`);
  }
}
