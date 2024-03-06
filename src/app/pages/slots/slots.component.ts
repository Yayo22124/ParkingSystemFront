import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageItemComponent } from '../../components/page-item/page-item.component';
import { SlotsService } from '../../core/services/slots/slots.service';
import { iSlot } from '../../core/interfaces/i-Slot';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [
    HeaderComponent,
    PageItemComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss',
})
export class SlotsComponent {
  constructor(
    private fb: FormBuilder,
    private slotsService: SlotsService,
    private _snackbar: MatSnackBar
  ) {}
  // ! Fees array result
  public slots: iSlot[] = [];
  // ! Slot create form
  public slotForm: FormGroup = this.fb.group({
    number: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllSlots();
  }

  getAllSlots() {
    this.slotsService.getSlots().subscribe((data: iSlot[]) => {
      console.log(data);

      this.slots = data;
    });
  }

  saveSlot() {
    if (this.slotForm.valid) {
      const slotData = this.slotForm.value;

      // Resolve request
      this.slotsService.createSlot(slotData).subscribe(
        (response) => {
          console.log('Espacio creado exitosamente', response);
          // Refresh slots and clients list
          this.getAllSlots();
          // feeeset slot forpFormGroup
          this.slotForm.reset();

          this._snackbar.open('Slot successfully created.', 'Close', {
            duration: 2.5 * 1000,
          });
        },
        (error) => {
          this._snackbar.open('Error creating slot.', 'Close', {
            duration: 2.5 * 1000,
          });
          console.error('Error al crear el espacio', error);
        }
      );
    }
  }

  deleteSlot(feeId: string) {
    this.slotsService.deleteSlot(feeId).subscribe(
      (res) => {
        console.log(`Eliminando espacio: ${res}`);

        // Refresh clients list
        this.getAllSlots();

        // Reset slot form
        this.slotForm.reset();

        // Show notification
        this._snackbar.open('Slot succesfully deleted.', 'Close', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        console.error(`Error al eliminar espacio: ${err}`);

        // Show notification
        this._snackbar.open('Error deleting slot.', 'Close', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
}
