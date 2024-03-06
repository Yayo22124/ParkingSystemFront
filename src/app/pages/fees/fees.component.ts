import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { FeesService } from '../../core/services/fees/fees.service';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageItemComponent } from '../../components/page-item/page-item.component';
import { iFee } from '../../core/interfaces/i-Fees';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [
    HeaderComponent,
    PageItemComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss',
})
export class FeesComponent {
  constructor(
    private fb: FormBuilder,
    private feesService: FeesService,
    private _snackbar: MatSnackBar
  ) {}
  // ! Fees array result
  public fees: iFee[] = [];
  // ! Fee create form
  public feeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cost: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getAllFees();
  }

  getAllFees() {
    this.feesService.getFees().subscribe((data: iFee[]) => {
      console.log(data);

      this.fees = data;
  })
  }


  saveFee() {
    if (this.feeForm.valid) {
      const feeData = this.feeForm.value;

      // Resolve request
      this.feesService.createFee(feeData).subscribe(
        (response) => {
          console.log('Tarifa creada exitosamente', response);
          // Refresh fees and clients list
          this.getAllFees();
          // feeeset fee forpFormGroup
          this.feeForm.reset();

          
          this._snackbar.open('Fee successfully created.', 'Close', {
            duration: 2.5 * 1000,
          })
        },
        (error) => {
          this._snackbar.open('Error creating fee.', 'Close', {
            duration: 2.5 * 1000,
          });
          console.error('Error al crear la tarifa', error);
        }
      );
    }
  }

  deleteFee(feeId: string) {
    this.feesService.deleteFee(feeId).subscribe(
      (res) => {
        console.log(`Eliminando tarifa: ${res}`);

        // Refresh clients list
        this.getAllFees();

        // Reset fee form
        this.feeForm.reset();

        // Show notification
        this._snackbar.open('Fee succesfully deleted.', 'Close', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        console.error(`Error al eliminar tarifa: ${err}`);

        // Show notification
        this._snackbar.open('Error deleting fee.', 'Close', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
}
