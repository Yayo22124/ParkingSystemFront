import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iClient } from '../../interfaces/i-client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getClients(): Observable<iClient[]> {
    return this.http.get<iClient[]>(`${apiUrl}/clients/`);
  }

  getOneClient(clientId: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/clients/${clientId}`);
  }

  createClient(newClient: iClient): Observable<any> {
    return this.http.post<any>(`${apiUrl}/clients/`, newClient);
  }

  updateClient(updateData: iClient, clientId: string): Observable<any> {
    return this.http.put<any>(`${apiUrl}/clients/${clientId}`, updateData)
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/clients/${clientId}`);
  }
}
