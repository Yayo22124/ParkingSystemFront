import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlotsService } from '../../core/services/slots/slots.service';
import { iSlot } from '../../core/interfaces/i-Slot';

@Component({
  selector: 'app-update-slot',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './update-slot.component.html',
  styleUrl: './update-slot.component.scss',
})
export class UpdateSlotComponent implements OnInit {
  uuid: string = '';
  slotData: iSlot = {
    id: '',
    number: 0,
    description: '',
    status: false,
  };

  constructor(
    private route: ActivatedRoute,
    private slotsService: SlotsService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  //! Update Form
  updateSlotForm: FormGroup = this.fb.group({
    number: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    // Get uuid
    this.uuid = this.route.snapshot.params['uuid'];
    this.loadSlotData();
  }

  loadSlotData() {
    this.slotsService.getOneSlot(this.uuid).subscribe((res) => {
      console.log(res.data);

      this.slotData = res.data;

      this.updateSlotForm.patchValue({
        number: this.slotData.number,
        description: this.slotData.description,
        status: this.slotData.status,
      });
    });
  }
  updateSlot() {
    if (this.updateSlotForm.valid) {
      const updatedSlot = this.updateSlotForm.value;
      this.slotsService.updateSlot(updatedSlot, this.uuid).subscribe(
        (res) => {
          this._snackbar.open('Slot successfully updated.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl('/slots');
        },
        (err) => {
          console.error(err);
          this._snackbar.open('Error updating slot.', 'Close', {
            duration: 2.5 * 1000,
          });
          this.router.navigateByUrl('/slots');
        }
      );
    }
  }
}
