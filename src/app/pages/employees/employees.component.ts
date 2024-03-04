import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { EmployeesService } from '../../core/services';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { iEmployee } from '../../core/interfaces/i-employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  panelOpenState = false;
  public employees: iEmployee[] = [];

  // * Constructor
  constructor(
    private employeesService: EmployeesService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}
  employeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: [''],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
    this.getAllEmployees();
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      this.employeesService.createEmployee(employeeData).subscribe(
        (response) => {
          console.log('Empleado creado exitosamente', response);
          this.getAllEmployees();
          this.employeeForm.reset("")

          this._snackbar.open("Employee successfully created.", "cerrar", {
            duration: 5 * 1000
          })
        },
        (error) => {
          this._snackbar.open("Error creating employee.", "cerrar", {
            duration: 5 * 1000
          })
          console.error('Error al crear el empleado', error);
        }
      );
    }
  }

  getAllEmployees() {
    this.employeesService.getEmployees().subscribe((data: iEmployee[]) => {
      console.log(data);
      this.employees = data;
    });
  }

 

  deleteEmployee(id: string){
    this.employeesService.deleteEmployee(id).subscribe((data) => {
      this._snackbar.open("Employee successfully deleted.", "cerrar", {
        duration: 5 * 1000
      })
      this.getAllEmployees();
    }, (error) => {
      console.error(error);
      this._snackbar.open("Error deleting employee.", "cerrar", {
        duration: 5 * 1000
      })
    })
  }
  editEmployee(id: string) {
    
  }
}
