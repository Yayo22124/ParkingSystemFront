import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClientsService } from '../../core/services/clients/clients.service';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { apiUrl } from '../../core/constants/apiUrl';
import { iClient } from '../../core/interfaces/i-client';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.scss',
})
export class UpdateClientComponent implements OnInit {
  uuid: string = '';
  clientData: iClient = {
    id: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  };

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  //! Update Form
  updateClientForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    address: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    // Get uuid
    this.uuid = this.route.snapshot.params['uuid'];
    this.loadClientData();
  }

  loadClientData() {
    this.clientService.getOneClient(this.uuid).subscribe((res) => {
      console.log(res.data);

      this.clientData = res.data;
      this.updateClientForm.patchValue({
        name: this.clientData.name,
        address: this.clientData.address,
        phoneNumber: this.clientData.phoneNumber,
        email: this.clientData.email,
      });
      console.log("Form data after patchValue:", this.updateClientForm.value);
    });
  }

  updateClient() {
    if (this.updateClientForm.valid) {
      const updatedClient = this.updateClientForm.value;
      this.clientService.updateClient(updatedClient, this.uuid).subscribe(
        (res) => {
          this._snackbar.open('Client successfully updated.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl("/clients")
        },
        (err) => {
          console.error(err);
          this._snackbar.open('Error updating client.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl("/clients")
        }
      );
    }
  }
}
