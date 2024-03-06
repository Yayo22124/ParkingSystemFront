import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iApiResponse } from '../../interfaces/i-ApiResponse';
import { iEmployee } from '../../interfaces/i-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<iEmployee[]> {
    return this.http.get<iEmployee[]>(`${apiUrl}/employees/`);
  }

  getOneEmployee(employeeId: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/employees/${employeeId}`);
  }

  createEmployee(newEmployee: iEmployee): Observable<iApiResponse> {
    return this.http.post<iApiResponse>(`${apiUrl}/employees/`, newEmployee);
  }

  updateEmployee(updatedEmployee: iEmployee, employeeId: string): Observable<iApiResponse> {
    return this.http.put<iApiResponse>(`${apiUrl}/employees/${employeeId}`, updatedEmployee);
  }

  deleteEmployee(employeeId: string): Observable<iApiResponse> {
    return this.http.delete<iApiResponse>(`${apiUrl}/employees/${employeeId}`);
  }
}
