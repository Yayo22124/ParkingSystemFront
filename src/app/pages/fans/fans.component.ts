import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FansService } from '../../core/services/fans/fans.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription } from 'rxjs';
import { iFanActuator } from '../../core/interfaces/i-FanActuator';

@Component({
  selector: 'app-fans',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatSnackBarModule],
  templateUrl: './fans.component.html',
  styleUrl: './fans.component.scss'
})
export class FANsComponent {
  constructor(
    private fansService: FansService,
    private _snackbar: MatSnackBar
  ) {
    
  }
  public read: iFanActuator = {
    id: '',
    status: false,
    registeredAt: ''
  };
  private subscription!: Subscription;

  ngOnInit(): void {
    // Iniciar el polling al cargar el componente
    this.startPolling();
  }

  ngOnDestroy(): void {
    // Detener el polling al destruir el componente para evitar fugas de memoria
    this.stopPolling();
  }

  getLastRead() {
    this.fansService.getLastFanActuator().subscribe((res) => {
      this.read = res;
    });
  }

  private startPolling() {
    // Iniciar el polling cada 5 segundos
    this.subscription = this.fansService.getLastFanActuator().subscribe((res) => {
      this._snackbar.open("Reading new data.", "Close", {
        duration: 1.5*1000
      })
      this.read = res;
    });
  }

  private stopPolling() {
    // Detener el polling al destruir el componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
