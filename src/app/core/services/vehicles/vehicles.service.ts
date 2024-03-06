import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iVehicle } from '../../interfaces/i-Vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<iVehicle[]> {
    return this.http.get<iVehicle[]>(`${apiUrl}/vehicles/`);
  }

  getOneVehicle(vehicleId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/vehicles/${vehicleId}`);
  }

  createVehicle(newVehicle: iVehicle): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/vehicles/`, newVehicle);
  }

  updateVehicle(
    updatedVehicle: iVehicle,
    vehicleId: string
  ): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/vehicles/${vehicleId}`,
      updatedVehicle
    );
  }

  deleteVehicle(vehicleId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/vehicles/${vehicleId}`);
  }
}
