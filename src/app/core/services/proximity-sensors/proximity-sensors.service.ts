import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iProximitySensor } from '../../interfaces/i-ProximitySensor';

@Injectable({
  providedIn: 'root',
})
export class ProximitySensorsService {
  constructor(private http: HttpClient) {}

  getProximitySensors(): Observable<iProximitySensor[]> {
    return this.http.get<iProximitySensor[]>(`${apiUrl}/proximity-sensors/`);
  }

  getLastProximitySensor(): Observable<iProximitySensor> {
    return this.http.get<iProximitySensor>(`${apiUrl}/proximity-sensors/last/`);
  }

  getOneProximitySensor(proximityId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/proximity-sensors/${proximityId}`);
  }

  createProximitySensor(newProximitySensor: iProximitySensor): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/proximity-sensors/`, newProximitySensor);
  }

  updateProximitySensor(
    updatedProximitySensor: iProximitySensor,
    proximityId: string
  ): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/proximity-sensors/${proximityId}`,
      updatedProximitySensor
    );
  }

  deleteProximitySensor(proximityId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(
      `${apiUrl}/proximity-sensors/${proximityId}`
    );
  }
}
