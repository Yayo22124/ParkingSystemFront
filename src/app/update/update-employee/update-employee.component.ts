import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmployeesService } from '../../core/services';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iEmployee } from '../../core/interfaces/i-employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent implements OnInit{
  uuid: string = '';
  employeeData: iEmployee = {
    id: '',
    name: '',
    username: '',
    address: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  //! Update Form
  updateEmployeeForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    address: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  ngOnInit(): void {
    // Get uuid
    this.uuid = this.route.snapshot.params['uuid'];
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    this.employeesService.getOneEmployee(this.uuid).subscribe((res: iApiResponse) => {
      console.log(res.data);

      this.employeeData = res.data;
      this.updateEmployeeForm.patchValue({
        name: this.employeeData.name,
        username: this.employeeData.username,
        address: this.employeeData.address,
        phoneNumber: this.employeeData.phoneNumber,
        email: this.employeeData.email,
        password: this.employeeData.password,
      });
      console.log("Form data after patchValue:", this.updateEmployeeForm.value);
    });
  }

  updateEmployee() {
    if (this.updateEmployeeForm.valid) {
      const updatedEmployee = this.updateEmployeeForm.value;
      this.employeesService.updateEmployee(updatedEmployee, this.uuid).subscribe(
        (res) => {
          this._snackbar.open('Employee successfully updated.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl("/employees")
        },
        (err) => {
          console.error(err);
          this._snackbar.open('Error updating employee.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl("/employees")
        }
      );
    }
  }
}
