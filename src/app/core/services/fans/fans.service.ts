import { Observable, interval, startWith, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iFanActuator } from '../../interfaces/i-FanActuator';

@Injectable({
  providedIn: 'root'
})
export class FansService {
  constructor(private http: HttpClient) {}

  getFanActuators(): Observable<iFanActuator[]> {
    return this.http.get<iFanActuator[]>(`${apiUrl}/fan-actuators/`);
  }

  getLastFanActuator(): Observable<iFanActuator> {
    return interval(5000).pipe(
      startWith(0),  // Emite el primer valor inmediatamente
      switchMap(() => this.http.get<iFanActuator>(`${apiUrl}/fan-actuators/last/`))
    );
  }
  getOneFanActuator(fanId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/fan-actuators/${fanId}`);
  }

  createFanActuator(newfan: iFanActuator): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/fan-actuators/`, newfan);
  }

  updateFanActuator(
    updatedFanActuator: iFanActuator,
    fanId: string
  ): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/fan-actuators/${fanId}`,
      updatedFanActuator
    );
  }

  deleteFanActuator(fanId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(
      `${apiUrl}/fan-actuators/${fanId}`
    );
  }
}
