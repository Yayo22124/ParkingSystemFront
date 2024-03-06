import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClientsService } from '../../core/services/clients/clients.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiclesService } from '../../core/services';
import { cVehicleTypes } from '../../core/constants/vehicleTypes';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iClient } from '../../core/interfaces/i-client';
import { iVehicle } from '../../core/interfaces/i-Vehicle';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [HeaderComponent, MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule, MatButtonModule ],
  templateUrl: './update-vehicle.component.html',
  styleUrl: './update-vehicle.component.scss'
})
export class UpdateVehicleComponent {
  constructor(
    private fb: FormBuilder,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // ! Type Vehicles array
  public vehicleTypes = cVehicleTypes;

  // ! Clients array for owner
  public clients: iClient[] = [];

  // ! Vehicle data
  public vehicleData: iVehicle = {
    id: "",
    plate: "",
    brand: "",
    model: "",
    owner: "",
    type: ""
  }
  // ! Vehicle create form
  public updateVehicleForm: FormGroup = this.fb.group({
    plate: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    type: ['', Validators.required],
    owner: ['', Validators.required],
  });

  public uuid: string = '';

  ngOnInit(): void {
    this.getClients();
    this.uuid = this.route.snapshot.params['uuid'];
    this.loadVehicleData();
  }

  getClients() {
    this.clientsService.getClients().subscribe(
      (data: iClient[]) => {
        console.log(data);

        this.clients = data;
      }
    );
  }

  loadVehicleData() {
    this.vehiclesService.getOneVehicle(this.uuid).subscribe((res: iApiResponse) => {
      console.log(`loadVehicleData: ${res}`);
      console.log(res);

      this.vehicleData = res.data;

      this.updateVehicleForm.patchValue({
        plate: this.vehicleData.plate,
        brand: this.vehicleData.brand,
        model: this.vehicleData.model,
        owner: this.vehicleData.owner,
        type: this.vehicleData.type,
      });
      console.log("Form data after patchValue:", this.updateVehicleForm.value);
    });
  }

  updateVehicle() {
    if (this.updateVehicleForm.valid) {
      const vehicleData = this.updateVehicleForm.value;

      // Resolve request
      this.vehiclesService.updateVehicle(vehicleData, this.uuid).subscribe(
        (response) => {
          console.log('Vehiculo actualizado exitosamente', response);
    
          // Open snackbar notification
          this._snackbar.open('Vehicle successfully updated.', 'Close', {
            duration: 5 * 1000,
          });
          this.router.navigateByUrl("/vehicles")
        },
        (error) => {
          this._snackbar.open('Error updating vehicle.', 'Close', {
            duration: 5 * 1000,
          });
          this.router.navigateByUrl("/vehicles")
          console.error('Error al crear el vehiculo', error);
        }
      );
    }
  }

  editVehicle(id: string) {}
}
