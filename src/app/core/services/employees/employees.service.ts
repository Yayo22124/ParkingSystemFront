import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { iEmployee } from '../../interfaces/i-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<iEmployee[]> {
    return this.http.get<iEmployee[]>(`${apiUrl}/employees/`);
  }

  getOneEmployee(employeeId: string): Observable<iEmployee> {
    return this.http.get<iEmployee>(`${apiUrl}/employees/${employeeId}`);
  }

  createEmployee(newEmployee: iEmployee): Observable<any> {
    return this.http.post<any>(`${apiUrl}/employees/`, newEmployee);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/employees/${employeeId}`);
  }
}
