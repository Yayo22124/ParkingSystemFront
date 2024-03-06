import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Component } from '@angular/core';
import { FeesService } from '../../core/services/fees/fees.service';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iFee } from '../../core/interfaces/i-Fees';

@Component({
  selector: 'app-update-fee',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './update-fee.component.html',
  styleUrl: './update-fee.component.scss',
})
export class UpdateFeeComponent {
  uuid: string = '';
  feeData: iFee = {
    id: '',
    name: '',
    cost: 0,
    status: false,
  };

  constructor(
    private route: ActivatedRoute,
    private feesService: FeesService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  //! Update Form
  updateFeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cost: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    // Get uuid
    this.uuid = this.route.snapshot.params['uuid'];
    this.loadFeeData();
  }

  loadFeeData() {
    this.feesService.getOneFee(this.uuid).subscribe((res) => {
      console.log(res.data);

      this.feeData = res.data;

      this.updateFeeForm.patchValue({
        name: this.feeData.name,
        cost: this.feeData.cost,
        status: this.feeData.status,
      });
    });
  }
  updateFee() {
    if (this.updateFeeForm.valid) {
      const updatedFee = this.updateFeeForm.value;
      this.feesService.updateFee(updatedFee, this.uuid).subscribe(
        (res) => {
          this._snackbar.open('Fee successfully updated.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl('/fees');
        },
        (err) => {
          console.error(err);
          this._snackbar.open('Error updating fee.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl('/fees');
        }
      );
    }
  }
}
