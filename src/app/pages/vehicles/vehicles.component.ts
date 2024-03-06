import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientsService } from '../../core/services/clients/clients.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageItemComponent } from '../../components/page-item/page-item.component';
import { VehiclesService } from '../../core/services';
import { cVehicleTypes } from '../../core/constants/vehicleTypes';
import { iClient } from '../../core/interfaces/i-client';
import { iVehicle } from '../../core/interfaces/i-Vehicle';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    PageItemComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent {
  constructor(
    private fb: FormBuilder,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    private _snackbar: MatSnackBar
  ) {}
  // ! Type Vehicles array
  public vehicleTypes = cVehicleTypes;

  // ! Clients array for owner
  public clients: iClient[] = [];

  // ! Vehicles array result
  public vehicles: iVehicle[] = [];
  // ! Vehicle create form
  public vehicleForm: FormGroup = this.fb.group({
    plate: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    type: ['', Validators.required],
    owner: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllVehicles();
    this.getClients();
  }

  getAllVehicles() {
    this.vehiclesService.getVehicles().subscribe((data: iVehicle[]) => {
      console.log(data);

      this.vehicles = data;
    });
  }

  getClients() {
    this.clientsService.getClients().subscribe(
      (data: iClient[]) => {
        console.log(data);

        this.clients = data;
      }
    );
  }

  saveVehicle() {
    if (this.vehicleForm.valid) {
      const vehicleData = this.vehicleForm.value;

      // Resolve request
      this.vehiclesService.createVehicle(vehicleData).subscribe(
        (response) => {
          console.log('Vehiculo creado exitosamente', response);
          // Refresh vehicles and clients list
          this.getAllVehicles();
          this.getClients();
          // Reset vehicle form
          this.vehicleForm.reset();

          // Open snackbar notification
          this._snackbar.open('Vehicle successfully created.', 'Close', {
            duration: 5 * 1000,
          });
        },
        (error) => {
          this._snackbar.open('Error creating vehicle.', 'Close', {
            duration: 5 * 1000,
          });
          console.error('Error al crear el vehiculo', error);
        }
      );
    }
  }

  editVehicle(id: string) {}

  deleteVehicle(vehicleId: string) {
    this.vehiclesService.deleteVehicle(vehicleId).subscribe(
      (res) => {
        console.log(`Eliminando vehiculo: ${res}`);

        // Refresh clients list
        this.getAllVehicles();

        // Reset vehicle form
        this.vehicleForm.reset();

        // Show notification
        this._snackbar.open('Vehicle succesfully deleted.', 'Close', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        console.error(`Error al eliminar vehiculo: ${err}`);

        // Show notification
        this._snackbar.open('Error deleting vehicle.', 'Close', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
}
