import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iFee } from '../../interfaces/i-Fees';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  constructor(private http: HttpClient) {}

  getFees(): Observable<iFee[]> {
    return this.http.get<iFee[]>(`${apiUrl}/fees/`);
  }

  getOneFee(feeId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/fees/${feeId}`);
  }

  createFee(newFee: iFee): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/fees/`, newFee);
  }

  updateFee(
    updatedFee: iFee,
    feeId: string
  ): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(
      `${apiUrl}/fees/${feeId}`,
      updatedFee
    );
  }

  deleteFee(feeId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/fees/${feeId}`);
  }
}
