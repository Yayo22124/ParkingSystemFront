import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClientsService } from '../../core/services/clients/clients.service';
import { CopyClipboardComponent } from '../../components/copy-clipboard/copy-clipboard.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageItemComponent } from '../../components/page-item/page-item.component';
import { iClient } from '../../core/interfaces/i-client';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatSnackBarModule,
    CopyClipboardComponent,
    PageItemComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  constructor(
    private readonly clientsService: ClientsService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}

  // ! Clients array result
  public clients: iClient[] = [];
  // ! Client create form
  public clientForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clientsService.getClients().subscribe((data: iClient[]) => {
      console.log(data);

      this.clients = data;
    });
  }

  saveClient() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;

      // Resolve request
      this.clientsService.createClient(clientData).subscribe(
        (response) => {
          console.log('Cliente creado exitosamente', response);
          // Refresh clients list
          this.getAllClients();
          // Reset client form
          this.clientForm.reset();

          // Open snackbar notification
          this._snackbar.open('Client successfully created.', 'cerrar', {
            duration: 5 * 1000,
          });
        },
        (error) => {
          this._snackbar.open('Error creating client.', 'cerrar', {
            duration: 5 * 1000,
          });
          console.error('Error al crear el empleado', error);
        }
      );
    }
  }

  editClient(id: string) {}

  deleteClient(clientId: string) {
    this.clientsService.deleteClient(clientId).subscribe(
      (res) => {
        console.log(`Eliminando cliente: ${res}`);

        // Refresh clients list
        this.getAllClients();

        // Reset client form
        this.clientForm.reset();

        // Show notification
        this._snackbar.open('Client succesfully deleted.', 'Close', {
          duration: 2.5*1000
        })
        
      },
      (err) => {
        console.error(`Error al eliminar cliente: ${err}`);
        
        // Show notification
        this._snackbar.open('Error deleting client.', 'Close', {
          duration: 2.5*1000
        })
      }
    )
  }
}
